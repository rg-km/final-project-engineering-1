type Props = {}

export default function NotFound({}: Props) {
  return (
    <div className="container">
      <div className="border rounded-lg p-8 space-y-4">
        <strong>KELOMPOK 1</strong>
        <table className="shadow-2x1 border-2 w-30">
          <thead>
            <tr>
              <th className="py-3">CAMP ID</th>
              <th className="py-3">NAMA</th>
              <th className="py-3">KELAS</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
            <th className="py-3 px-6">FE 2252749</th>
            <th className="py-3 px-6">ACHMAD MUSYAFFA TAUFIQI</th>
            <th className="py-3 px-6">FE 11</th>
            </tr>
            <tr>
            <th className="py-3 px-6">FE 2258356</th>
            <th className="py-3 px-6">NURANITA MARDIANA</th>
            <th className="py-3 px-6">FE 11</th>
            </tr>
            <tr>
            <th className="py-3 px-6">BE 2084185</th>
            <th className="py-3 px-6">ANIS FARHAN ITSNAINI</th>
            <th className="py-3 px-6">BE 01</th>
            </tr>
            <tr>
            <th className="py-3 px-6">BE 2054415</th>
            <th className="py-3 px-6">IKSAN NURSALIM</th>
            <th className="py-3 px-6">BE 01</th>
            </tr>
            <tr>
            <th className="py-3 px-6">BE 2152665</th>
            <th className="py-3 px-6">MUHAMMAD ANGGA</th>
            <th className="py-3 px-6">BE 01</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}