
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  //kiểu return trả về của hàm search. Mặc định là return kiểu page. ('list' - trả về 1 list)
  const [size, setSize] = React.useState(''); // tên trường nhận kích thước của thẻ
  const [typeReturnFunction, setTypeReturnFunction] = React.useState('');
  const [displayLable, setDisplayLable] = React.useState('');   // tên trường để hiển thị ra cho người dùng chọn (mặc định sẽ là code)
  const [defaultValue, setDefaultValue] = React.useState([]); //giá trị mặc định ban đầu
  const [className, setClassName] = React.useState([]); //class của thẻ Autocomplete
  const [variant, setVariant] = React.useState([]);     //kiểu hiển thị của thẻ TextValidator
  const [multiple, setMultiple] = React.useState(false);  //chọn nhiều hay chọn 1
  const [validators, setValidators] = React.useState([]);   // Truyền vào kiểu validators muốn check
  const [errorMessages, setErrorMessages] = React.useState([]); //Text hiển thị khi check validators (theo thứ tự các validators truyền vào)
  const loading = open && options.length === 0;
  //tạm thời không sử dụng selectChildName.
  const [selectChildName, setSelectChildName] = React.useState(''); //Nếu muốn so sánh id object bên trong của value thì truyền tên object bên trong Ex: selectChildName = {'objectName'}
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      //searchFunction: hàm search data
      //searchObject: object chứa các thuộc tính search bên trong
      const response = await props.searchFunction(props.searchObject)
      const data = await ((props.typeReturnFunction && props.typeReturnFunction == 'list') ? response.data : response.data.content);
      if (active) {
        setOptions(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
      setTypeReturnFunction([]);
      setDisplayLable([]);
      setDefaultValue([]);
      setMultiple([]);
      setVariant([]);
      setSelectChildName([]);
      setClassName([]);
      setValidators([]);
      setErrorMessages([]);
      setSize([]);
    }
  }, [open]);
  return (
    <Autocomplete
      id="asynchronous-demo"
      className={props.className ? props.className : "w-100"}
      open={open}
      autoComplete
      autoHighlight={true}
      multiple={props.multiple}
      onChange={(event, value, reason, details) => {
        let list = [];
        if (props.selectChildName) {
          value.forEach(item => {
            if (item.id == details.option.id) {
              list.push({ [props.selectChildName]: item });
            } else {
              list.push(item);
            }
          });
        }
        else {
          list = value;
        }
        props.onSelect(list, props.onSelectOptions);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => (props.selectChildName && option[props.selectChildName]) ? option[props.selectChildName].id === value[props.selectChildName].id : option.id === value.id}
      getOptionLabel={(option) => option ? ((props.selectChildName && option[props.selectChildName]) ? ((props.displayLable) ? option[props.selectChildName][props.displayLable] : option[props.selectChildName].code) : ((props.displayLable) ? option[props.displayLable] : option.code)) : ''}
      options={options}
      defaultValue={props.defaultValue ? props.defaultValue : null}
      loading={loading}
      disabled = {props.disabled}
      renderInput={(params) => (
        <TextValidator
          {...params}
          label={props.label}
          value={props.value ? props.value : null}
          validators={props.validators ? props.validators : []}
          errorMessages={props.errorMessages ? props.errorMessages : ""}
          variant={props.variant ? props.variant : "standard"}
          size = {props.size ? props.size : "medium"}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={10} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    // renderOption={(option, { inputValue }) => {
    //   const matches = match((option) => (props.selectChildName && option[props.selectChildName]) ? ((props.displayLable) ? option[props.selectChildName][props.displayLable] : option[props.selectChildName].code) : ((props.displayLable) ? option[props.displayLable] : option.code), inputValue);
    //   const parts = parse((option) => (props.selectChildName && option[props.selectChildName]) ? ((props.displayLable) ? option[props.selectChildName][props.displayLable] : option[props.selectChildName].code) : ((props.displayLable) ? option[props.displayLable] : option.code), matches);
    //   return (
    //     <div>
    //       {parts.map((part, index) => (
    //         <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
    //           {part.text}
    //         </span>
    //       ))}
    //     </div>
    //   );
    // }}
    />
  );
}