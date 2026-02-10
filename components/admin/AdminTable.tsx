interface AdminTableProps {
  headers: string[]
  children: React.ReactNode
}

export default function AdminTable({ headers, children }: AdminTableProps) {
  return (
    <div className="overflow-x-auto border-2 border-gray-200 dark:border-gray-600 rounded-lg">
      <table className="w-full font-body text-sm">
        <thead>
          <tr className="bg-brand-dark text-white">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-heading font-bold uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 [&_tr]:border-t [&_tr]:border-gray-200 dark:[&_tr]:border-gray-600 [&_tr:hover]:bg-gray-50 dark:[&_tr:hover]:bg-gray-700">{children}</tbody>
      </table>
    </div>
  )
}
