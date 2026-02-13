import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import styles from './Layout.module.css';


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

      const res = await fetch("http://localhost:8080/backend/api/menuList", {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
      } );

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
        <table>
            <thead>
                <tr className={styles.mythead}>
                    <td >
                        <Header/>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <main style={{ display: "flex", height: "100vh" }}>
                        <section style={{ width: 200, borderRight: "1px solid #ccc" }}>
                            
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

                        <section style={{ flex: 1, padding: 16 }}>
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
