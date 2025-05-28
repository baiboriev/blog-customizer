import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { ReactNode, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { OnClick } from 'src/ui/arrow-button/ArrowButton';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	children: ReactNode;
	isOpen: boolean;
	onClick: OnClick;
	onSubmit(e: React.FormEvent<HTMLFormElement>): void;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	handleClear(): void;
};

export const ArticleParamsForm = ({
	children,
	isOpen = false,
	onClick,
	onSubmit,
	onChange,
	onClose,
	handleClear,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={rootRef}>
				<form className={styles.form} onSubmit={onSubmit}>
					{children}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClear}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
