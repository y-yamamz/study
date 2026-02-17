import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import { SERVICE_URL } from '../constants/const';
import Button from '@mui/material/Button';
import { Stack, TextField } from '@mui/material';


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
      const res = await fetch(SERVICE_URL.BASE_URL + "api/todoList", {
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

const createTask = async (tasks:TodoList[]) => {
  const res = await fetch(SERVICE_URL.BASE_URL + "api/todoRegister", {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
    },
    body:JSON.stringify(tasks),
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

  const handleRegister = () => {
    
    try{
    

      createTask(tasks);
      alert("登録しました。");
    }catch(e){
      alert("登録に失敗しました。");
    }
  } 

  const handleAddRow = () => {
    setTasks([...tasks, { 
      systemCd: "",
      projectCd: "",
      ticketNo: "",
      systemName: "",
      projectName: "",
      statusNm: "",
      deployNm: "",
      revisionNo: "",
      statusCd: "0",
      deployCd: "0",
      note: "",
      biko: "",
      yukoFlag: "0"
    }]);
  }


  const handleChange  =  (
    index:number,
    field:keyof TodoList,
    value:string
  ) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  }


  return (
    <div>
      <Stack direction="row" spacing={2} sx={{mb:2}}>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          登録
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          追加
        </Button>
      </Stack>

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
                <TableCell align="right">
                  <TextField variant='outlined' size='small'
                    value={row.note}
                    onChange={(e) => handleChange(tasks.indexOf(row), "note", e.target.value)}
                  />
                  
                </TableCell>
                <TableCell align="right">
                  <TextField variant='outlined' size='small'
                    value={row.biko}
                    onChange={(e) => handleChange(tasks.indexOf(row), "biko", e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </div>
  )
}

export default TaskListPage