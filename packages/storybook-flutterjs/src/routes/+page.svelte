
<script lang="ts">

</script>


<svg viewBox="0 0 200 200">
   <!-- 클립패스 요소 -->
  <clipPath id="circle">
	  <circle cx="25" cy="25" r="25" />  
  </clipPath>
  <clipPath id="with-rect" clip-path="url(#circle)">
	  <rect x="25" y="25" width="25" height="25" />  
  </clipPath>
  <clipPath id="clippath" clip-path="url(#with-rect)" style="transform: translateX(-10px);">
	  <rect x="35" y="25" width="15" height="10" />  
  </clipPath>
  <rect clip-path="url(#clippath)" on:click={() => alert('clicked!!')} fill="yellow" x="0" y="0" width="50" height="50" />

</svg>
