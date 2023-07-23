// Hooks
import {FC, useEffect, useState} from 'react'
import {useAppDispatch} from "../../hooks/redux.ts"
import {postsSearch} from "../../modules/Home/redux/postsSlice.ts"

// Components
import {Input} from '../Input/MyInput.tsx'

// Styles
import styles from './Header.module.scss'

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