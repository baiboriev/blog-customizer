import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { RadioGroup } from './ui/radio-group';
import { Select } from './ui/select';
import { Separator } from './ui/separator';
import { Text } from './ui/text';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleOptions, setArticleOptions] = useState({
		...defaultArticleState,
	});
	const [isOpen, setIsOpen] = useState(false);

	const [fontFamilyOption, setFontFamilyOption] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeOption, setFontSizeOption] = useState(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const toggleForm = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setArticleOptions({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
		e.preventDefault();
	};

	const handleClear = () => {
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setArticleOptions(defaultArticleState);
	};

	return (
		<>
			<main
				className={clsx(styles.main)}
				style={
					{
						'--font-family': articleOptions.fontFamilyOption.value,
						'--font-size': articleOptions.fontSizeOption.value,
						'--font-color': articleOptions.fontColor.value,
						'--container-width': articleOptions.contentWidth.value,
						'--bg-color': articleOptions.backgroundColor.value,
					} as CSSProperties
				}>
				<ArticleParamsForm
					isOpen={isOpen}
					onClick={toggleForm}
					onSubmit={handleSubmit}
					handleClear={handleClear}
					onChange={setIsOpen}>
					<Text
						as={'h2'}
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) => setFontFamilyOption(selected)}
						// onClose={}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={(value: OptionType) => setFontSizeOption(value)}
						title='Размер шрифта'
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={(selected: OptionType) => setFontColor(selected)}
						// onClose={}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) => setBackgroundColor(selected)}
						// onClose={}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) => setContentWidth(selected)}
						// onClose={}
						title='Ширина контента'
					/>
				</ArticleParamsForm>
				<Article />
			</main>
		</>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
