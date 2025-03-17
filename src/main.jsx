import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getList } from './api/https';
import { removeDuplicate, removeAccented } from './utils/setup';
import Input from './component/Input';
import Checkbox from './component/Checkbox';
import List from './component/List';
import './style.css';
import Button from './component/Button';
import IMAGES from './Images/Images'
import Tabs from './component/Tabs';

const App = () => {
    const initial = {
        key: '',
        nhom_loi: '',
        doi_tuong: '',
        muc_do: '',
    }

    const [data, setData] = useState();
    const [dataFill, setDataFill] = useState();
    const [filter, setFilter] = useState(initial);
    const [select1, setSelect1] = useState([]);
    const [select2, setSelect2] = useState([]);
    const [select3, setSelect3] = useState([
        'Nhẹ',
        'Trung bình',
        'Nặng',
        'Nghiêm trọng',
    ]);
    const [listKey, setListKey] = useState([]);
    const [listKey2, setListKey2] = useState([]);

    useEffect(() => {
        getList().then(response => {
            const dataFilter = response.filter(item => {
                return item.bo_luat !== null;
            })
            setData(dataFilter);
            setDataFill(dataFilter);
            const allNhomLoi = response.filter((item) => {
                return typeof item.nhom_loi === 'string';
            });
            const allNhomLoi2 = allNhomLoi.map((item) => {
                return item.nhom_loi;
            })
            setSelect1(removeDuplicate(allNhomLoi2));

            const allDoiTuong = response.filter((item) => {
                return typeof item.doi_tuong === 'string';
            });
            const allDoiTuong2 = allDoiTuong.map((item) => {
                return item.doi_tuong;
            })
            setSelect2(removeDuplicate(allDoiTuong2));

            const allKey = [];
            response.forEach((item) => {
                allKey.push(...item.tim_kiem);
            });
            const newAllKey = allKey.map(item => item);
            const newAllKey2 = removeDuplicate(newAllKey);
            setListKey(newAllKey2);
            setListKey2(newAllKey2);
        })
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if(data) {
            let dataNew = [];
            dataNew = data.filter(item => {
                return removeAccented(item.nhom_loi).includes(removeAccented(filter.nhom_loi));
            });
            dataNew = dataNew.filter(item => {
                if(filter.doi_tuong === 'Tất cả CBNV'){
                    return item;
                } else {
                    return removeAccented(item.doi_tuong).includes(removeAccented(filter.doi_tuong));
                }
            });
            dataNew = dataNew.filter(item => {
                return removeAccented(item.muc_do).includes(removeAccented(filter.muc_do));
            });
            setDataFill(dataNew);
        }
        
    }, [filter.nhom_loi, filter.doi_tuong, filter.muc_do]);

    const handleKey = (e) => {
        setFilter((prev) => ({...prev, key: e.target.value}));
        const newListKey = listKey.filter((item) => {
            if(removeAccented(item).includes(removeAccented(e.target.value))){
                return item;
            }
        });
        setListKey2(newListKey);
    };

    const handleDropdown = (value) => {
        setFilter((prev) => ({...prev, key: value}));
        const newListKey = listKey.filter((item) => {
            if(removeAccented(item).includes(removeAccented(value))){
                return item;
            }
        });
        setListKey2(newListKey);
    }

    const handleSelect1 = (e) => {
        setFilter((prev) => ({...prev, nhom_loi: e.target.innerText}));
    }

    const handleSelect2 = (e) => {
        setFilter((prev) => ({...prev, doi_tuong: e.target.value}));
    }

    const handleSelect3 = (e) => {
        setFilter((prev) => ({...prev, muc_do: e.target.value}));
    }

    const handleSearch = () => {
        let dataNew;
        dataNew = dataFill.filter(item => {
            const itemNonAccented = item.tim_kiem.map(keyWord => removeAccented(keyWord));
            if(filter.key) {
                return itemNonAccented.includes(removeAccented(filter.key));
            } else {
                return dataNew;
            }
             
        });
        setDataFill(dataNew);
    }

    return (
        <div className='filter_ksnb_1_0_0'>
            <div className='filter_ksnb_1_0_0__top'>
                <div className="container">
                    {
                        <>
                            <div className='filter_ksnb_1_0_0__search'>
                                <Input placeholder="Nhập từ khóa tìm kiếm" event={handleKey} value={filter.key} dropdown={listKey2} handleDropdown={handleDropdown}/>
                                <Button icon={IMAGES.iconSearch} background="primary" style={{marginLeft: '10px'}} event={filter.key ? handleSearch : null}>TÌM KIẾM</Button>
                            </div>
                            <Tabs data={select1} event={handleSelect1} value={filter.nhom_loi}/>
                        </>
                    }
                </div>
            </div>
            <div className='container'>
                <div className='filter_ksnb_1_0_0__center'>
                    <div className='filter_ksnb_1_0_0__aside'>
                        <div className='filter_ksnb_1_0_0__label'>
                            <div className='filter_ksnb_1_0_0__head'>
                                <div className='filter_ksnb_1_0_0__icon'><img src={IMAGES.iconFilter} alt="" /></div>
                                <div className='filter_ksnb_1_0_0__text'>Lọc nâng cao</div>
                            </div>
                            {(filter.doi_tuong || filter.muc_do || filter.nhom_loi) && <Button background="second" size="small" event={() => {setFilter(initial); setDataFill(data); setListKey2(listKey)}}>Xóa lọc</Button>}
                        </div>
                        <div className='filter_ksnb_1_0_0__filter'>
                            {/* {<Checkbox placeholder="Lỗi" label="Nhóm lỗi" option={select1} event={handleSelect1} value={filter.nhom_loi}/>} */}
                            {<Checkbox placeholder="Đối tượng" label="Nhóm đối tượng" option={select2} event={handleSelect2} value={filter.doi_tuong}/>}
                            {<Checkbox placeholder="Mức độ" label="Mức độ nghiêm trọng" option={select3} event={handleSelect3} value={filter.muc_do}/>}
                        </div>
                    </div>
                    <div className='filter_ksnb_1_0_0__main'>
                        {dataFill && <List data={dataFill}/>}
                    </div>
                </div>
            </div>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));