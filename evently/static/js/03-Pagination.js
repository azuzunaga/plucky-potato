const Pagination = props => {
  const { previous, next, page, pages } = props.pageInfo;
  return (
    <section className="pagination">
      <button onClick={() => props.fetchPage(previous)} disabled={!previous}>
        ← Prev
      </button>
      <span>
        Page {page} of {pages}
      </span>
      <button onClick={() => props.fetchPage(next)} disabled={!next}>
        Next →
      </button>
    </section>
  );
};
