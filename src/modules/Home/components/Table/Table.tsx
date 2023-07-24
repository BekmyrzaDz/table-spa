// Hooks
import {FC} from 'react'
import {useAppDispatch} from "../../../../hooks/redux.ts"

// Libraries
import {clsx} from "clsx"

// Slices
import {sortPostsById, sortPostsByTitleAndDescription} from "../../redux/postsSlice.ts";

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
      dispatch(sortPostsById())
    } else if (value.toLowerCase() === 'Заголовок'.toLowerCase()) {
      dispatch(sortPostsByTitleAndDescription())
    } else if (value.toLowerCase() === 'Описание'.toLowerCase()) {
      dispatch(sortPostsByTitleAndDescription())
    }
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns?.map(column => (
            <th key={column.field} className={styles.headCell}>
              <div onClick={() => clickHandler(column?.headerName)}>
                {column?.headerName}
                <img className={styles.arrowDownImg} src={arrowDown} alt="arrow-down"/>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {posts?.map(post => (
          <tr key={post?.id}>
            <td className={clsx(styles.bodyCell, styles.bodyCellId)}>{post?.id}</td>
            <td className={clsx(styles.bodyCell, styles.bodyCellTitle)}>{post?.title}</td>
            <td className={clsx(styles.bodyCell, styles.bodyCellDescr)}>{post?.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};