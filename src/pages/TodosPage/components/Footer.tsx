import FooterType from '../types/FooterType'

export default function Footer({ countOfActiveTodos, countOfCompletedTodos }: FooterType) {
    return (
        <footer className="app-footer p-4"><span className='count  text-warning'>{countOfActiveTodos}</span> more to do, <span className='count  text-warning'>{countOfCompletedTodos}</span> done</footer>
    )
}
