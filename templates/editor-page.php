<div class="yt-thumbnail-maker-container" style="padding: 20px; direction: rtl; font-family: Arial, sans-serif;">
  <div class="controls" style="margin-bottom: 20px;">
    <label style="margin-left: 10px;">:Language
      <select id="language">
        <option value="ur" selected>اردو</option>
        <option value="en">English</option>
        <option value="ar">العربية</option>
        <option value="hi">हिन्दी</option>
        <option value="zh">中文</option>
      </select>
    </label>

    <label style="margin-left: 10px;">:Title
      <input type="text" id="titleText" placeholder="ہیڈلائن لکھیں..." />
    </label>

    <label style="margin-left: 10px;">:Subtitle
      <input type="text" id="subtitleText" placeholder="...ذیلی سرخی لکھیں" />
    </label>

    <label style="margin-left: 10px;">:Font Size
      <input type="range" id="fontSize" min="20" max="100" value="48" />
    </label>

    <label style="margin-left: 10px;">:Text Color
      <input type="color" id="textColor" value="#ffffff" />
    </label>

    <label style="margin-left: 10px;">:Background Color
      <input type="color" id="bgColor" value="#000000" />
    </label>

    <label style="margin-left: 10px;">:Upload Image
      <input type="file" id="imageUpload" accept="image/*" />
    </label>

    <button id="downloadBtn" style="margin-left: 10px; background: red; color: white; padding: 5px 10px; border: none; border-radius: 5px;">Download Thumbnail</button>
  </div>

  <div class="canvas-container" style="border: 2px solid #ccc;">
    <canvas id="thumbnailCanvas" width="1280" height="720"></canvas>
  </div>

  <!-- Fabric.js Library -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js"></script>

  <!-- Custom Script -->
  <script src="<?php echo plugin_dir_url(__FILE__); ?>../assets/js/script.js"></script>
</div>
