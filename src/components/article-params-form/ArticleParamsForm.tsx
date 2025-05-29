import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onChange(newData: ArticleStateType): void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onChange } = props;
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement>(null);

	const [customizerState, setCustomizerState] = useState({
		...defaultArticleState,
	});

	const toggleForm = () => {
		setIsOpen(!isOpen);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onChange: setIsOpen,
	});

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setCustomizerState((prevState: ArticleStateType) => ({
				...prevState,
				[field]: value,
			}));
		};
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		onChange(customizerState);
		e.preventDefault();
	};

	const handleFormClear = () => {
		setCustomizerState(defaultArticleState);
		onChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text
						as={'h2'}
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={customizerState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOnChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={customizerState.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={customizerState.fontColor}
						onChange={handleOnChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={customizerState.backgroundColor}
						onChange={handleOnChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={customizerState.contentWidth}
						onChange={handleOnChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleFormClear}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
