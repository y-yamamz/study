import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import styles from './Layout.module.css';
import { apiFetch } from "../common/apiClient";


interface MenuListDto{
    id:string;
    name:String;
    url:string;
};

const getMenuList = async (): Promise<MenuListDto[]>  => {

  
      const data: MenuListDto = {
        id:"",
        name:"",
        url:""
      }

      const res = await apiFetch("api/menuList", {
        method:"POST",
        body:JSON.stringify(data),
      });

      if(!res.ok){
        throw new Error("fetch failed");
      }
            
      return  await  res.json();
}


export const Layout = () => {

  const [menus, setMenus] = useState<MenuListDto[]>([]);

  useEffect(() =>  {

    const init = async () => {
      const lst = await getMenuList();
      setMenus(lst);

    }
    try{
      init();
      console.log(menus.length);
    }catch(e){

    }

  },[]);


  return (
    <>  
        <table style={{ width: "100%", tableLayout: "fixed" }}>
            <thead>
                <tr className={styles.mythead}>
                    <td>
                        <Header/>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ width: "100%" }}>
                        <main style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
                        <section style={{ width: 200, flexShrink: 0, borderRight: "1px solid #ccc" }}>

                            {menus.map(menu => (
                                <Link
                                key={menu.id}
                                to={menu.url}
                                className={styles.menuLink}
                                >
                                {menu.name}
                                </Link>
                            ))}

                        </section>

                        <section style={{ flex: 1, minWidth: 0, padding: 16, overflowY: "auto", overflowX: "hidden" }}>
                            {/* ← ここが差し替わる */}
                            <Outlet />
                        </section>
                        </main>
                    </td>
                </tr>
            </tbody>
        </table>
        
        
    </>
  );
};
