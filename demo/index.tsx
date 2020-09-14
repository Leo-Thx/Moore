import * as React from "react";
import * as ReactDOM from "react-dom";

import "normalize.css";
import "./../components/index.scss";

import { Menu } from "./../components/index";

import IconDemo from "./../components/icon/demo/index";
import ButtonDemo from "./../components/button/demo/index";
import AlertDemo from "./../components/alert/demo/index";
import MenuDemo from './../components/menu/demo/index';

import "./demo.scss";

const demoMap = [
	{ label: "图标", index: "icon", render: () => <IconDemo /> },
	{ label: "按钮", index: "button", render: () => <ButtonDemo /> },
	{ label: "提示", index: "alert", render: () => <AlertDemo /> },
	{ label: "菜单", index: "menu", render: () => <MenuDemo /> },
];

function Demo() {
	const comMap = React.useMemo(() => demoMap, []);
	const [currentCom, setCurrentCom] = React.useState('icon');

	const handleClick = React.useCallback((level, index)=>{
		setCurrentCom(index);
	}, []);

	const renderNav = () => <Menu defaultActive="icon" onClick={handleClick}>{
		comMap.map((item) => {
			return (
				<Menu.MenuItem key={item.index} index={item.index}>
					{item.label}
				</Menu.MenuItem>
			);
		})
	}</Menu>;

	const CurrentCom = React.useMemo(()=>{
		return demoMap.find(item=>item.index === currentCom);
	}, [currentCom]);


	return (
		<div className="demo-wrapper">
			<nav>{renderNav()}</nav>
			<section>{CurrentCom.render()}</section>
		</div>
	)
}

ReactDOM.render(
	<Demo></Demo>,
	document.getElementById("app")
);
