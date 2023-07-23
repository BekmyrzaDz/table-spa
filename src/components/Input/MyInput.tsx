import { FC } from 'react'
import { InputProps } from './MyInput.props'
import { clsx } from 'clsx'

import styles from './MyInput.module.scss'

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <input
        className={styles.input}
        {...props}
        placeholder={props.placeholder}
      />
    </div>
  )
}
