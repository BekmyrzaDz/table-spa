// Hooks
import {FC} from 'react'
import {useAppDispatch} from "../../../../hooks/redux.ts"

// Libraries
import {clsx} from "clsx"

// Slices
import {postsSortById, postsSortByTitleAndDescription} from "../../redux/postsSlice.ts";

// Images
import arrowDown from '../../../../assets/icons/arrow-down.svg'

// Styles
import styles from './Table.module.scss'

// Types
import {IColumns, IPost} from "../../types/types.ts"

interface ITableProps {
  posts: IPost[]
  columns: IColumns[]
}

export const Table: FC<ITableProps> = ({posts, columns}) => {
  const dispatch = useAppDispatch()

  const clickHandler = (value: string): void => {
    if (value.toLowerCase() === 'ID'.toLowerCase()) {
      dispatch(postsSortById())
    } else if (value.toLowerCase() === 'Заголовок'.toLowerCase()) {
      dispatch(postsSortByTitleAndDescription())
    } else if (value.toLowerCase() === 'Описание'.toLowerCase()) {
      dispatch(postsSortByTitleAndDescription())
    }
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns?.map(column => (
            <th key={column.field} className={styles.headCell}>
              <span onClick={() => clickHandler(column?.headerName)}>
                {column?.headerName}
                <img className={styles.arrowDownImg} src={arrowDown} alt="arrow-down"/>
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {posts?.map(post => (
          <tr key={post?.id}>
            <td className={clsx(styles.bodyCell, styles.bodyCellId)}>{post?.id}</td>
            <td className={styles.bodyCell}>{post?.title}</td>
            <td className={styles.bodyCell}>{post?.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};