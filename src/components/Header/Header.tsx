import {FC, useEffect, useState} from 'react'
import {Input} from '../Input/MyInput.tsx'
import styles from './Header.module.scss'
import {useAppDispatch} from "../../hooks/redux.ts";
import {postsSearch} from "../../modules/Home/redux/postsSlice.ts";

export const Header: FC = () => {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    dispatch(postsSearch(searchValue))
  }, [dispatch, searchValue])

  return (
    <div className={styles.wrapper}>
      <Input
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        name={'input'}
        placeholder={'Поиск'}
      />
    </div>
  );
};