import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TransformerMaintenanceHistoryProps {
  transformerId: string
}

export function TransformerMaintenanceHistory({ transformerId }: TransformerMaintenanceHistoryProps) {
  // This would normally fetch data based on the transformer ID
  const maintenanceHistory = [
    {
      id: 1,
      date: "2025-03-02",
      type: "Routine Inspection",
      findings: "No issues found",
      technician: "Mark Paul",
      nextScheduled: "2025-09-02",
    },
    {
      id: 2,
      date: "2024-09-15",
      type: "Oil Testing",
      findings: "Oil quality within acceptable parameters",
      technician: "Sarah Nambi",
      nextScheduled: "2025-03-15",
    },
    {
      id: 3,
      date: "2024-03-20",
      type: "Preventive Maintenance",
      findings: "Bushings cleaned, connections tightened",
      technician: "John Mukasa",
      nextScheduled: "2024-09-20",
    },
    {
      id: 4,
      date: "2023-09-10",
      type: "Thermal Imaging",
      findings: "No hotspots detected",
      technician: "David Okello",
      nextScheduled: "2024-03-10",
    },
    {
      id: 5,
      date: "2023-03-05",
      type: "Annual Overhaul",
      findings: "Cooling system cleaned, oil filtered",
      technician: "Grace Atim",
      nextScheduled: "2024-03-05",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Maintenance Type</TableHead>
            <TableHead className="hidden md:table-cell">Findings</TableHead>
            <TableHead className="hidden lg:table-cell">Technician</TableHead>
            <TableHead>Next Scheduled</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceHistory.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell className="hidden md:table-cell">{record.findings}</TableCell>
              <TableCell className="hidden lg:table-cell">{record.technician}</TableCell>
              <TableCell>{new Date(record.nextScheduled).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

