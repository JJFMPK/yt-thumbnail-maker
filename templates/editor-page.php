<div class="yt-thumbnail-maker-container">
  <div class="controls">
    <label>Language:
      <select id="language">
        <option value="en">English</option>
        <option value="ur">اردو</option>
        <option value="ar">عربی</option>
        <option value="hi">हिन्दी</option>
        <option value="zh">中文</option>
      </select>
    </label>

    <label>Title:
      <input type="text" id="titleText" placeholder="Enter headline..." />
    </label>

    <label>Subtitle:
      <input type="text" id="subtitleText" placeholder="Enter subheadline..." />
    </label>

    <label>Font Size:
      <input type="range" id="fontSize" min="20" max="80" value="48" />
    </label>

    <label>Text Color:
      <input type="color" id="textColor" value="#ffffff" />
    </label>

    <label>Background Color:
      <input type="color" id="bgColor" value="#000000" />
    </label>

    <label>Upload Image:
      <input type="file" id="imageUpload" accept="image/*" />
    </label>

    <button id="downloadBtn">Download Thumbnail</button>
  </div>

  <div class="canvas-container">
    <canvas id="thumbnailCanvas" width="1280" height="720"></canvas>
  </div>
</div>
