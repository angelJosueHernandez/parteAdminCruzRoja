import React from 'react'

const TableEmergencias = (props) => {
  return (
    <div>
      <header className='bg-blue-950 shadow'>
        <div className='mx-auto py-3 px-4'>
          <h1 className='text-white font-bold text-3xl'>Emergencias</h1>
        </div>
      </header>
      <main>
        <div className='mx-auto py-1'>
          {props.children}
        </div>
      </main>
    </div>
  )
}

export default TableEmergencias

