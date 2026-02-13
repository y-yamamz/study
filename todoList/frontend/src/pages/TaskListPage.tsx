import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";


export interface TodoListKey {
  systemCd: string;
  projectCd: string;
  ticketNo: string;

}


export interface TodoList extends TodoListKey {  
  systemName:string;
  projectName:string;
  statusNm:string;
  deployNm:string;
  revisionNo: string;
  statusCd: string;
  deployCd: string;
  note: string;
  biko: string;
  yukoFlag: string;
/*
  insDate: Date;
  insUserId: string;
  updDate: Date;
  updUserId: string;
*/
}

const getTaskList = async (): Promise<TodoList[]>  => {

  
      const res = await fetch("http://localhost:8080/backend/api/todoList", {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        
      } );

      if(!res.ok){
        throw new Error("fetch failed");
      }
            
      return  await  res.json();
}



const TaskListPage = () => {

  const [tasks, setTasks] = useState<TodoList[]>([]);

  useEffect(() =>  {

    const init = async () => {
      const lst = await getTaskList();
      setTasks(lst);

    }
    try{
      init();
      console.log(tasks.length);
    }catch(e){

    }

  },[]);



  return (
    <>


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>プロジェクト</TableCell>
            <TableCell align="right">チケット番号</TableCell>
            <TableCell align="right">リビジョン番号</TableCell>
            <TableCell align="right">進捗状態&nbsp;</TableCell>
            <TableCell align="right">デプロイ状態&nbsp;</TableCell>
            <TableCell align="right">内容&nbsp;</TableCell>
            <TableCell align="right">備考&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((row) => (
            <TableRow
              key={row.projectCd + row.ticketNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.projectName}
              </TableCell>
              <TableCell align="right">{row.ticketNo}</TableCell>
              <TableCell align="right">{row.revisionNo}</TableCell>
              <TableCell align="right">{row.statusNm}</TableCell>
              <TableCell align="right">{row.deployNm}</TableCell>
              <TableCell align="right">{row.note}</TableCell>
              <TableCell align="right">{row.biko}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    </>
  )
}

export default TaskListPage