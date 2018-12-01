const Pagination = props => {
  const { previous, next, page, pages } = props.pageInfo;
  return (
    <section className="pagination">
      <button onClick={() => props.fetchPage(previous)} disabled={!previous}>
        ← Prev
      </button>
      <p>
        Page {page} of {pages}
      </p>
      <button onClick={() => props.fetchPage(next)} disabled={!next}>
        Next →
      </button>
    </section>
  );
};