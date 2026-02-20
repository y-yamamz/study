import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { SERVICE_URL } from '../constants/const';
import Button from '@mui/material/Button';
import { MenuItem, Stack, TextField } from '@mui/material';


export interface MstProject {
  systemCd: string;
  cd: string;
  projectName: string;
}

export interface MstCode {
  grCd: string;
  cd: string;
  cdName: string;
}

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

/**
 * TODOリストの取得
 * @returns 
 */
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


const getProjectList = async (): Promise<MstProject[]>  => {
      const data: MstProject = {
        systemCd:"001",
        Cd:"",
        projectName:""
      }
      const res = await fetch(SERVICE_URL.BASE_URL + "api/getMstProjectCbbList", {
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

/**
 * 進捗状態の取得
 * @returns 
 */
const getProgressStatusName = async():Promise<MstCode[]> => {

      const data: MstCode = {
        grCd:"001",
        cd:"",
        cdName:""
      }
      const res = await fetch(SERVICE_URL.BASE_URL + "api/getMstCodeCbbList", {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
      } );  
      if(!res.ok){
        throw new Error("fetch failed");
      }

      return await res.json();
}

/**
 * デプロイ状態の取得
 * @returns 
 */
const getDeployStatusName = async():Promise<MstCode[]> => {
      const data: MstCode = {
        grCd:"002",
        cd:"",
        cdName:""
      }
      const res = await fetch(SERVICE_URL.BASE_URL + "api/getMstCodeCbbList", {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
      } );  
      if(!res.ok){
        throw new Error("fetch failed");
      }

      return await res.json();
}

/**
 * TODOリストの登録
 * @param tasks 
 * @returns 
 */
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


/**
 * TODOリストのページ
 * @returns 
 */
const TaskListPage = () => {
  const [projectsCodes, setProjectsCodes] = useState<MstProject[]>([]);
  const [statusCodes, setStatusCodes] = useState<MstCode[]>([]);
  const [deployCodes, setDeployCodes] = useState<MstCode[]>([]);
  const [tasks, setTasks] = useState<TodoList[]>([]);

  /**
   * TODOリストの初期化
   */
  useEffect(() =>  {

    const init = async () => {
      const lst = await getTaskList();
      setTasks(lst);
      const statusCdList = await getProgressStatusName();
      setStatusCodes(statusCdList);
      const deployCdList = await getDeployStatusName();
      setDeployCodes(deployCdList);
      const projectList = await getProjectList();
      setProjectsCodes(projectList); 

    }
    try{
      init();
      console.log(tasks.length);
    }catch(e){

    }

  },[]);

  /**
   * TODOリストの登録処理
   */
  const handleRegister = () => {
    
    try{
      createTask(tasks);
      alert("登録しました。");
    }catch(e){
      alert("登録に失敗しました。");
    }
  } 

  /**
   * TODOリストの行追加処理
   */
  const handleAddRow = () => {
    setTasks([...tasks, { 
      systemCd: crypto.randomUUID(),
      projectCd: crypto.randomUUID(),
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

  /**
   * 入力データを反映する処理
   * @param index 
   * @param field 
   * @param value 
   */
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
      <Paper sx={{ width: "70%", overflow: "hidden" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 400 ,overflow: "auto"}}>
          <Table sx={{ minWidth: "70%",tableLayout: "fixed" }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{width: 150, borderRight: "1px solid #4e4c4c" ,backgroundColor:"#90bef3dc"}}>プロジェクト</TableCell>
                <TableCell align="center" sx={{ width: 150, borderRight: "1px solid #4e4c4c" ,backgroundColor:"#90bef3dc"}}>チケット番号</TableCell>
                <TableCell align="center" sx={{ width: 150, borderRight: "1px solid #4e4c4c" ,backgroundColor:"#90bef3dc"}}>リビジョン番号</TableCell>
                <TableCell align="center" sx={{ width: 150, borderRight: "1px solid rgb(78, 76, 76)" ,backgroundColor:"#90bef3dc"}}>進捗状態&nbsp;</TableCell>
                <TableCell align="center" sx={{ width: 150, borderRight: "1px solid #4e4c4c" ,backgroundColor:"#90bef3dc"}}>デプロイ状態&nbsp;</TableCell>
                <TableCell align="center" sx={{ width: 250, borderRight: "1px solid #4e4c4c" ,backgroundColor:"#90bef3dc"}}>内容&nbsp;</TableCell>
                <TableCell align="center" sx={{ width: 250, backgroundColor:"#90bef3dc"}}>備考&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((row) => (
                <TableRow
                  key={row.projectCd + row.ticketNo}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Select value={row.projectCd} size='small' fullWidth
                            onChange={(e) => handleChange(tasks.indexOf(row), "projectCd", e.target.value)}>
                      <MenuItem value="">選択してください</MenuItem>
                      {projectsCodes.map(project => (
                        <MenuItem key={project.cd} value={project.cd}>{project.projectName}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    <TextField variant='outlined' size='small'
                      value={row.ticketNo}
                      onChange={(e) => handleChange(tasks.indexOf(row), "ticketNo", e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField variant='outlined' size='small' sx={{width:"100%"}}
                      value={row.revisionNo}
                      onChange={(e) => handleChange(tasks.indexOf(row), "revisionNo", e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center"> 
                    <Select value={row.statusCd} size='small' fullWidth 
                            onChange={(e) => handleChange(tasks.indexOf(row), "statusCd", e.target.value)}>
                      <MenuItem value="">選択してください</MenuItem>
                      {statusCodes.map(code => (
                        <MenuItem key={code.cd} value={code.cd}>{code.cdName}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Select value={row.deployCd} size='small' fullWidth
                            onChange={(e) => handleChange(tasks.indexOf(row), "deployCd", e.target.value)}>
                      <MenuItem value="">選択してください</MenuItem>
                      {deployCodes.map(code => (
                        <MenuItem key={code.cd} value={code.cd}>{code.cdName}</MenuItem>
                      ))}
                    </Select>

                  </TableCell>
                  <TableCell align="right">
                    <TextField variant='outlined' size='small'
                      value={row.note} sx={{width:"100%"}}
                      onChange={(e) => handleChange(tasks.indexOf(row), "note", e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField variant='outlined' size='small' sx={{width:"100%"}}
                      value={row.biko}
                      onChange={(e) => handleChange(tasks.indexOf(row), "biko", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default TaskListPage