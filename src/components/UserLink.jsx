// const platforms = ["GitHub", "YouTube", "Twitter", "LinkedIn"];
const UserLink = ({ userLink, onDelete }) => {
  return (
    <>
      <div>
        <header>
          <div>
            <h2>Link #{userLink?.order}</h2>
          </div>
          <button type="button" className="btn" onClick={onDelete}>
            Remove
          </button>
        </header>
        {/* <div className="input-group"> */}
        {/*   <label htmlFor="platform">Platform</label> */}
        {/*   <select id="platform" name="platform"> */}
        {/*     <optgroup> */}
        {/*       {platforms.map((p) => { */}
        {/*         <option value={p.toLowerCase().replace(" ", "_")}>{p}</option>; */}
        {/*       })} */}
        {/*     </optgroup> */}
        {/*   </select> */}
        {/* </div> */}
        <div className="input-group">
          <label htmlFor="url">Link</label>
          <input type="text" name="url" id="url" value={userLink?.url} />
        </div>
      </div>
    </>
  );
};

export default UserLink;
