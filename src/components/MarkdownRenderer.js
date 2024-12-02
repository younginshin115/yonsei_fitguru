import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// 스타일링을 위한 CSS
const markdownStyles = {
    container: "p-8 rounded-lg text-left",
    heading: "text-lg font-bold text-primary",
    paragraph: "text-sm text-gray-700 mt-4 leading-relaxed",
    list: "list-disc list-inside ml-8",
    listItem: "text-sm text-gray-700 m-2",
    emphasis: "font-semibold",
    strong: "font-bold text-gray-800",
};

const MarkdownRenderer = ({ markdownText }) => {
    return (
        <div className={markdownStyles.container}>
            <ReactMarkdown
                children={markdownText}
                remarkPlugins={[remarkGfm]}
                components={{
                    del: ({ children }) => <span> ~ {children} ~ </span>,
                    h2: ({ children }) => (
                        <h2 className={markdownStyles.heading}>{children}</h2>
                    ),
                    p: ({ children }) => (
                        <p className={markdownStyles.paragraph}>{children}</p>
                    ),
                    ul: ({ children }) => (
                        <ul className={markdownStyles.list}>{children}</ul>
                    ),
                    li: ({ children }) => (
                        <li className={markdownStyles.listItem}>{children}</li>
                    ),
                    em: ({ children }) => (
                        <em className={markdownStyles.emphasis}>{children}</em>
                    ),
                    strong: ({ children }) => (
                        <strong className={markdownStyles.strong}>{children}</strong>
                    ),
                }}
            />
        </div>
    );
};

export default MarkdownRenderer;
