import TableEmergencias from '../../Components/Tables/TableEmergencias'
import DateTable from '../DateTable'

export default function HomeAdmin() {
  return (
    <div>
      <TableEmergencias>
        <DateTable/>
      </TableEmergencias>
    </div>
  )
}
