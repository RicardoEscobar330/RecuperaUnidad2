import React from 'react'
import DataTable from 'react-data-table-component'
import { Spinner } from 'flowbite-react'

const Loading = () => {
    return (<div className='flex flex-wrap gap-2'>
        <div className='text-center'>
            <Spinner size={'xl'}/>
        </div>
    </div>
    );
};

const options = {
    rowsPerPageText: 'Registros por página',
    rangeSeparatorText: 'de',
}

const TableComponent = ({
    Columns, data, options, onSort, progress
}) => {
  return (
    <DataTable
    className="w-full text-left text-sm text-gray-500" 
    columns={Columns}
    data={data}
    onSort={onSort}
    pagination
    paginationComponent={options}
    noDataComponent={"Sin Registros"}
    progressPending={progress}
    progressComponent={<Loading/>}
    />
  )
}

export default TableComponent
