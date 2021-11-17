import React from 'react';
import { useSelector } from 'react-redux';
 
import ButtonWrite from './ButtonWrite';
import ButtonDelete from './ButtonDelete';
import Csv from './Csv';
import Excel from './Excel';
 
function Footer() {
	// store 의 상태가 바뀔 때마다 상태를 받아온다.
    const checkedList = useSelector(state => state.list.checkedList);
    const uri = useSelector(state => state.uri.inputData)

    return(
        <div className="btn_group">
            <div className="fr">
                <ButtonWrite /> 
                {checkedList.length !== 0 ? <ButtonDelete></ButtonDelete> : ''}
                <Excel></Excel>
                <Csv></Csv>
            </div>
        </div>

    );
}
 
export default Footer;