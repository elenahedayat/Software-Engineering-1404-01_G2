from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS


def simple_normalize(text: str) -> str:
    return (
        text.replace("ي", "ی")
            .replace("ك", "ک")
            .replace("‌", " ")
            .strip()
    )


class SemanticSearchService:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
        )

    def search(self, articles, query, k=10):
        """
        articles: list[WikiArticle]
        query: str
        """

        if not articles:
            return []

        documents = [
            simple_normalize(
                f"{a.title_fa} {a.summary or ''} {a.body_fa}"
            )
            for a in articles
        ]

        vectorstore = FAISS.from_texts(documents, self.embeddings)

        results = vectorstore.similarity_search_with_score(query, k=k)

        # برگرداندن مقاله‌ها به ترتیب شباهت معنایی
        ranked_articles = []
        for doc, score in results:
            index = documents.index(doc.page_content)
            ranked_articles.append((articles[index], score))

        return ranked_articles
