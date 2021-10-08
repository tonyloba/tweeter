// function counts all symbols entered in form (including delete and backspace!):
const tweetStringCounter = function() {
  let typedSymbols = 0;
  const maxSymbols = 140;
  $("#tweet-text").on("input", function() {
    typedSymbols++;
    $('#type-counter').text(typedSymbols)
  // console.log(this);
  // console.log(`typed: ${typedSymbols}`)
  let stringLength=$(this).val().length;
  let numOfSymbolsLeft = maxSymbols - stringLength;
  if(stringLength >= maxSymbols) {
    $("#counter").text(numOfSymbolsLeft);
    $("#counter").css("color", "red");
  } else {
    $("#counter").text(numOfSymbolsLeft + " Characters left");
    $("#counter").css("color", "#44423b");
  }


  });
}


$(document).ready(function() {
  tweetStringCounter()
console.log("doc is ready")
});
