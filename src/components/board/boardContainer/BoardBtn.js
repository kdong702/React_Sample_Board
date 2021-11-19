import React from 'react';
import { useSelector } from 'react-redux';
 
import CreBtn from '../../common/CreBtn';
import DelBtn from '../../common/DelBtn';
import CsvBtn from '../../common/CsvBtn';
import ExcelBtn from '../../common/ExcelBtn';
 
function Footer() {
	// store 의 상태가 바뀔 때마다 상태를 받아온다.
    const checkedList = useSelector(state => state.list.checkedList);

    return(
        <div className="btn_group">
            <div className="fr">
                <CreBtn /> 
                {checkedList.length !== 0 ? <DelBtn/> : ''}
                <ExcelBtn/>
                {checkedList.length !== 0 ? <CsvBtn/> : ''}
            </div>
        </div>

    );
}
 
export default Footer;