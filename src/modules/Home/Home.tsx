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

  const [page, setPage] = useState<number>(1)

  const limit = 10
  const pageQyt = 10

  if (pageQyt < page) {
    setPage(1)
  }

  useEffect(() => {
    dispatch(getPosts({page, limit}))
  }, [dispatch, page])

  const columns: IColumns[] = [
    {field: 'id', headerName: 'ID'},
    {field: 'title', headerName: 'Заголовок'},
    {field: 'body', headerName: 'Описание'},
  ];

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
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
              }}>
                <Pagination
                  count={pageQyt}
                  page={page}
                  onChange={(_: React.ChangeEvent<unknown>, num: number) => setPage(num)}
                  sx={{marginX: 3, marginY: 'auto'}}
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
                                font: 'inherit',
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
                                font: 'inherit',
                                color: 'inherit',
                                backgroundColor: 'transparent',
                              }}
                            >Назад</button>
                        }}
                        sx={{
                          '& MuiButtonBase-root': {
                            padding: 20,
                            border: 'none',
                            font: 'inherit',
                            color: 'inherit',
                            backgroundColor: 'transparent',
                          },
                          '& .MuiPaginationItem-icon': {
                            margin: '0 115px'
                          }
                        }}
                        {...item}
                      />
                    )}
                />
              </Box>
            )}
          </Stack>
        </Box>
      )}
    </>
  )
}