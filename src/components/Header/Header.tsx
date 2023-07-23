import {FC, useState} from 'react'
import {Input} from '../Input/MyInput.tsx'
import styles from './Header.module.scss'

export const Header: FC = () => {
  const [value, setValue] = useState('')

  return (
    <div className={styles.wrapper}>
      <Input name={'input'} placeholder={'Поиск'}/>
    </div>
  );
};