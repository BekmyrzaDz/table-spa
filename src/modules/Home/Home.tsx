// Hooks
import {FC, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts"

// Libraries
import {Link} from 'react-router-dom'
import {Box, Pagination, PaginationItem, Stack} from "@mui/material"

// Actions
import {getPosts} from "./redux/asyncActions.ts"

// Components
import {Table} from "./components/Table/Table.tsx"

// Types
import {IColumns, IPostsState} from "./types/types.ts"

export const Home: FC = () => {
  const {
    posts,
    filteredPosts,
    isLoading
  }: IPostsState = useAppSelector(state => state?.posts)
  const dispatch = useAppDispatch()

  const currentPage: string = JSON.parse(localStorage.getItem('currentPage') as string)
  const [page, setPage] = useState<number>(parseInt(currentPage as string) || 1)

  const limit = 10
  const pageQyt = 10

  useEffect(() => {
    dispatch(getPosts({page, limit}))
  }, [dispatch, page])

  const columns: IColumns[] = [
    {field: 'id', headerName: 'ID'},
    {field: 'title', headerName: 'Заголовок'},
    {field: 'body', headerName: 'Описание'},
  ];

  const changeHandler = (num: number): void => {
    setPage(num)
    localStorage.setItem('currentPage', JSON.stringify(num))
  }

  return (
    <>
      {isLoading ? (
        <h2
          style={{
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: 18
          }}
        >Loading...</h2>
      ) : (
        <Box sx={{width: '100%', height: '100%', paddingBottom: '12px'}}>
          <Stack spacing={2}>
            <Table posts={filteredPosts} columns={columns}/>
            {posts && (
              <Pagination
                count={pageQyt}
                page={page}
                onChange={(_: React.ChangeEvent<unknown>, num: number) => changeHandler(num)}
                sx={{
                  marginX: 3,
                  marginY: 'auto',

                  '.MuiPagination-ul': {
                    display: 'flex',
                    justifyContent: 'center',

                    'li:nth-of-type(1)': {
                      alignSelf: 'flex-start',
                      marginRight: '20%',
                      '& a': {
                        '& button': {
                            fontFamily: 'Roboto',
                            fontSize: '24px',
                            fontWeight: 500,
                            color: '#474955',
                          '& span': {
                          },
                        },
                      },
                    },
                    'li:last-child': {
                      alignSelf: 'flex-end',
                      marginLeft: '20%',
                      '& a': {
                        '& button': {
                          fontFamily: 'Roboto',
                          fontSize: '24px',
                          fontWeight: 500,
                          color: '#474955',
                          '& span': {
                          },
                        },
                      },
                    },
                  },
                }}
                renderItem={
                  (item) => (
                    <PaginationItem
                      component={Link}
                      to={`/?page=${item.page}`}
                      components={{
                        next: (props) =>
                          <button
                            {...props}
                            style={{
                              padding: 20,
                              border: 'none',
                              color: 'inherit',
                              backgroundColor: 'transparent',
                            }}
                          >Далее</button>,
                        previous: (props) =>
                          <button
                            {...props}
                            style={{
                              padding: 20,
                              border: 'none',
                              color: 'inherit',
                              backgroundColor: 'transparent',
                            }}
                          >Назад</button>
                      }}
                      {...item}
                    />
                  )}
              />
            )}
          </Stack>
        </Box>
      )}
    </>
  )
}