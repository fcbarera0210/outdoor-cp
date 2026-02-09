interface AdminTableProps {
  headers: string[]
  children: React.ReactNode
}

export default function AdminTable({ headers, children }: AdminTableProps) {
  return (
    <div className="overflow-x-auto border-2 border-gray-200 rounded-lg">
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
        <tbody className="bg-white">{children}</tbody>
      </table>
    </div>
  )
}
