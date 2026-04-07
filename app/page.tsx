interface TreeNode {
  nameAr: string;
  nameEn: string;
  slug: string;
  children?: TreeNode[];
}

async function getCategories() {
  const res = await fetch("http://localhost:8080/categories");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export default async function Home() {
  const categories = await getCategories();
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <div className="category-tree">
        <MegaMenu nodes={categories} />
      </div>
    </div>
  );
}

const Node = ({ node, level }: { node: TreeNode; level: number }) => {
  if (level === 1) {
    return (
      <div className="">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          {node.nameAr}
        </h3>
        {node.children && (
          <ul className="space-y-3">
            {node.children.map((child) => (
              <Node key={child.slug} node={child} level={level + 1} />
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (level === 2) {
    return (
      <li>
        <a
          href="#"
          className="text-gray-600 hover:text-blue-600 transition-colors block"
        >
          {node.nameAr}
        </a>
      </li>
    );
  }

  return null;
};

const MegaMenu = ({ nodes }: { nodes: TreeNode[] }) => {
  return (
    <nav className="relative bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 space-x-8">
          {nodes.map((node) => (
            <div
              key={node.slug}
              className="relative h-full flex items-center group"
            >
              <button className="px-3 py-2 font-medium text-gray-700 hover:text-blue-600 transition-colors">
                {node.nameAr}
              </button>
              {node.children && node.children.length > 0 && (
                <div className="hidden group-hover:block absolute top-full left-0 w-[600px] bg-white shadow-xl border border-gray-100 rounded-b-lg z-50 p-6">
                  <div className="grid grid-cols-2 gap-8">
                    {node.children.map((child) => (
                      <Node key={child.slug} node={child} level={1} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
