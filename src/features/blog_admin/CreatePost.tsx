function CreatePost() {
  return (
    <div className="create__container">
      <h2 className="heading-1">Create a Post</h2>
      <form className="create__form">
        {/* MAIN */}
        <div className="create__main">
          {/* BANNER Image */}
          <div className="create__main-banner">Banner</div>
          {/* TITLE */}
          <div className="create__main-title">
            <input type="text" name="title" id="title" placeholder="title" />
          </div>
          {/* TAGS */}
          <div className="create__main-tag">
            <input
              type="text"
              name="tag"
              id="tag"
              className="create__main-tag"
              placeholder="Add a tag (press enter or comma)"
            />
          </div>
          <div className="create__main-tags">
            <span>javascript</span> <span>css</span> <span>aws</span>
          </div>

          {/* DESCRIPTION */}
          <div className="create__main-description">
            <textarea name="description" id="description" placeholder="Add description"></textarea>
          </div>
        </div>

        {/* EDITOR */}
        <div className="create__content">Content</div>

        {/* BUTTONS */}
        <div className="create__btns">buttons</div>
      </form>
    </div>
  );
}

export default CreatePost;
