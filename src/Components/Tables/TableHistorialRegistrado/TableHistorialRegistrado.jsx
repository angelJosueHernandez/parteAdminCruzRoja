import React, { useState, useEffect } from 'react';
import './TableHistorialRegistrado.css';
import { Link } from 'react-router-dom';
import { Pagination, DatePicker, Input, Select } from 'antd';
import { Cascader } from 'antd';

const { Option } = Select;

const TableHistorialRegistrado = () => {
    const [historial, setHistorial] = useState([]);
    const [antecedentes, setAntecedentes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filterDate, setFilterDate] = useState(null);
    const [filterMunicipio, setFilterMunicipio] = useState(null);
    const [filterColonia, setFilterColonia] = useState(null);
    const [filterAlergia, setFilterAlergia] = useState(null);
    const [filterNombre, setFilterNombre] = useState('');
    const [filterAntecedente, setFilterAntecedente] = useState('');

    const URLUser = 'http://localhost:3000/historialMedico';
    const URLAntecedentes = 'http://localhost:3000/Antecedente';

    useEffect(() => {
        const peticionGetHistorial = async () => {
            const response = await fetch(URLUser);
            const data = await response.json();
            setHistorial(data);
        };

        const peticionGetAntecedentes = async () => {
            const response = await fetch(URLAntecedentes);
            const data = await response.json();
            setAntecedentes(data);
        };

        peticionGetHistorial();
        peticionGetAntecedentes();

        const interval = setInterval(() => {
            peticionGetHistorial();
            peticionGetAntecedentes();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }

    function normalizeString(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const filterItems = () => {
        return historial.filter(item => {
            const filterDateLower = filterDate ? formatDate(filterDate).toLowerCase() : '';
            const filterMunicipioLower = filterMunicipio ? filterMunicipio.toLowerCase() : null;
            const filterColoniaLower = filterColonia ? filterColonia.toLowerCase() : null;
            const filterAlergiaLower = filterAlergia ? filterAlergia.toLowerCase() : null;
            const filterNombreLower = filterNombre ? normalizeString(filterNombre).toLowerCase().trim() : '';
            const filterAntecedenteLower = filterAntecedente ? normalizeString(filterAntecedente).toLowerCase().trim() : '';

            const fechaItemLower = formatDate(item.fecha).toLowerCase();
            const municipioItemLower = item.Municipio.toLowerCase();
            const coloniaItemLower = item.colonia.toLowerCase();
            const alergias = item.alergico_Medicamento.split(',').map(alergia => alergia.trim().toLowerCase());

            const dateMatch = !filterDateLower || fechaItemLower.includes(filterDateLower);
            const municipioMatch = !filterMunicipioLower || municipioItemLower.includes(filterMunicipioLower);
            const coloniaMatch = !filterColoniaLower || coloniaItemLower.includes(filterColoniaLower);
            const alergiaMatch = !filterAlergiaLower || alergias.some(alergia => alergia.includes(filterAlergiaLower));
            const nombreParts = filterNombreLower ? filterNombreLower.split(' ') : [];

            const nombreMatch = !filterNombreLower ||
                nombreParts.every(part =>
                    [item.nombre.toLowerCase(), item.apellido_Paterno.toLowerCase(), item.apellido_Materno.toLowerCase()].some(name => normalizeString(name).includes(part))
                );

            const antecedenteMatch = !filterAntecedenteLower ||
                antecedentes.some(antecedente =>
                    normalizeString(antecedente.nombre.toLowerCase()).includes(filterAntecedenteLower) &&
                    antecedente.ID_Historial === item.ID_Historial
                );

            return dateMatch && municipioMatch && coloniaMatch && alergiaMatch && nombreMatch && antecedenteMatch;
        });
    };

    const totalPages = Math.ceil(filterItems().length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterItems().slice(indexOfFirstItem, indexOfLastItem);

    const onChangePage = (page) => setCurrentPage(page);
    const onChangeItemsPerPage = (current, size) => {
        setCurrentPage(1);
        setItemsPerPage(size);
    };

    const columns = [
        { title: 'ID', dataIndex: 'ID_Historial', key: 'ID_Historial' },
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha', render: formatDate },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Apellido Paterno', dataIndex: 'apellido_Paterno', key: 'apellido_Paterno' },
        { title: 'Apellido Materno', dataIndex: 'apellido_Materno', key: 'apellido_Materno' },
        { title: 'Teléfono', dataIndex: 'telefono', key: 'telefono' },
        { title: 'Nombre del Contacto', dataIndex: 'nombre_Contacto', key: 'nombre_Contacto' },
        { title: 'Teléfono de Emergencia', dataIndex: 'telefono_Contacto', key: 'telefono_Contacto' },
        {
            title: 'Acción',
            key: 'accion',
            render: (text, record) => (
                <div className='btn_mostrarH'>
                    <Link className='verMas' to={`/HistorialRegistrado/HistorialCompleto/${record.ID_Historial}`}>
                        Ver completo
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1 className='title_emergencias'>Historiales Médicos</h1>
            <div>
                <legend className='text-sm'>Filtros</legend>
                <Input
                    placeholder="Buscar por Nombre"
                    value={filterNombre}
                    onChange={e => setFilterNombre(e.target.value)}
                    allowClear
                    className='Input'
                />
                <Input
                    placeholder="Escribir Antecedente Patológico"
                    value={filterAntecedente}
                    onChange={e => setFilterAntecedente(e.target.value)}
                    className='Input'
                    allowClear
                />
                <DatePicker
                    value={filterDate}
                    onChange={date => setFilterDate(date)}
                    allowClear
                    className='Input'
                />
                <Input
                    placeholder="Municipio"
                    value={filterMunicipio}
                    onChange={e => setFilterMunicipio(e.target.value)}
                    allowClear
                    className='Input'
                />
                <Input
                    placeholder="Colonia"
                    value={filterColonia}
                    onChange={e => setFilterColonia(e.target.value)}
                    allowClear
                    className='Input'
                />
                <Select
                    placeholder="Alergico Medicamentos"
                    value={filterAlergia}
                    onChange={value => setFilterAlergia(value)}
                    className='Input'
                    allowClear
                >
                    <Option value="no aplica">No aplica</Option>
                    <Option value="penicilina">Penicilina</Option>
                    <Option value="amoxicilina">Amoxicilina</Option>
                    <Option value="aspirina">aspirina</Option>
                    <Option value="codeina">codeina</Option>
                    <Option value="sulfonamidas">sulfonamidas</Option>
                    <Option value="trimetoprim">trimetoprim</Option>
                    <Option value="naproxeno">naproxeno</Option>
                    <Option value="cefalexina">cefalexina</Option>
                    <Option value="metamizol">metamizol</Option>
                    <Option value="acetaminofen">acetaminofen</Option>
                    <Option value="diclofenaco">diclofenaco</Option>
                    <Option value="eritromicina">eritromicina</Option>
                    <Option value="doxiciclina">doxiciclina</Option>
                    <Option value="cloranfenicol">cloranfenicol</Option>
                    <Option value="oxicodona">oxicodona</Option>
                    <Option value="tetraciclina">tetraciclina</Option>
                    <Option value="atorvastatina">atorvastatina</Option>
                    <Option value="fluconazol">fluconazol</Option>
                    <Option value="Paracetamol">Paracetamol</Option>
                    <Option value="Ketorolaco">Ketorolaco</Option>
                    <Option value="Losartán">Losartán</Option>
                    <Option value="ibuprofeno">ibuprofeno</Option>
                </Select>
              {currentItems.length === 0 ? (
                    <div>
                        <div className="textLe">
                            No se encontraron registros
                        </div>
                        <div className="data">
                            <Cascader.Panel />
                        </div>
                    </div>

                ) : (
                    <table className='tabla_emergencias'>
                        <thead>
                            <tr>
                                {columns.map(column => (
                                    <th key={column.key}>{column.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.ID_Historial}>
                                    {columns.map(column => (
                                        <td key={column.key}>{column.render ? column.render(item[column.dataIndex], item) : item[column.dataIndex]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <br />
            <div className='pagination'>
                <Pagination
                    current={currentPage}
                    onChange={onChangePage}
                    total={filterItems().length}
                    showSizeChanger
                    showQuickJumper
                    pageSizeOptions={['5', '10']}
                    onShowSizeChange={onChangeItemsPerPage}
                    locale={{
                        items_per_page: 'Registros por página',
                        jump_to: 'Ir a',
                        jump_to_confirm: 'confirmar',
                        page: 'Página'
                    }}
                />
            </div>
        </div>
    );
};

export default TableHistorialRegistrado;
