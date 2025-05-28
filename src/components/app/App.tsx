import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import styles from './App.module.scss';

import { useState, CSSProperties } from 'react';

export const App = () => {
	const [articleState, setArticleState] = useState({ ...defaultArticleState });

	const onChange = (newData: ArticleStateType) => {
		setArticleState(newData);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm articleState={articleState} onChange={onChange} />
			<Article />
		</main>
	);
};
