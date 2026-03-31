import TextField, { type TextFieldProps }  from '@mui/material/TextField';
import { Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from 'react';

type Props = Omit<TextFieldProps, 'onChange'> & {
  value: string;
  onChange: (v: string) => void;
};

/**
 * キー入力のたびに親 state を更新せず、blur 時のみ伝播するテキストフィールド。
 * Tab キー押下時は onKeyDown で即座に伝播し、その後の blur では二重更新しない。
 * 親 state がリセット（登録後など）されたときは useEffect で local state を同期する。
 */
const LocalTextField = ({ value, onChange, ...rest }: Props) => {
  const [local, setLocal] = useState(value);
  const tabPressed = useRef(false);

  useEffect(() => { setLocal(value); }, [value]);

  return (
    <Tooltip title={value}>
      <TextField
        {...rest}
        variant="outlined"
        size="small"
        fullWidth
        value={local}
        onChange={e => setLocal(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Tab') { tabPressed.current = true; onChange(local); }
        }}
        onBlur={() => {
          if (tabPressed.current) { tabPressed.current = false; return; }
          onChange(local);
        }}
        sx={{
          "& .MuiInputBase-input": {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          },
        }}
      />
    </Tooltip>
  );
};

export default LocalTextField;
