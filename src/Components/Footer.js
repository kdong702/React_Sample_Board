import React from 'react';
import { useSelector } from 'react-redux';
 
import ButtonWrite from './ButtonWrite';
import ButtonDelete from './ButtonDelete';
import Csv from './Csv';
import Excel from './Excel';
 
function Footer() {
	// store 의 상태가 바뀔 때마다 상태를 받아온다.
    const uri = useSelector(state => state.uriReducer.inputData);
    const checkedList = useSelector(state => state.list.checkedList);
 
    return(
        <div className="btn_group">
            <div className="fr">
                {/* <li><ButtonHome /></li> */}
                {/* 받아온 상태가 '/BoardNew' 가 아닐때만 버튼을 보여준다. */}
                {uri !== '/BoardNew' ? <ButtonWrite /> : ''
                }

                {checkedList.length !== 0 ? <ButtonDelete></ButtonDelete> : ''}
                <Excel></Excel>
                <Csv></Csv>
            </div>
        </div>

    );
}
 
export default Footer;