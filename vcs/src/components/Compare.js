/*import React,{Component} from 'react'; 

class Compare extends Component{
 buttonCompareClicked=()=>
 {      
     var textBefore = document.getElementById("textareaBefore").value;
     var textAfter = document.getElementById("textareaAfter").value;
   
     var differences = new TextDifferencer().findDifferencesBetweenStrings
     (
         textBefore,
         textAfter
     );
   
     var differencesAsString = differences.toString();
   
     var textareaDifferences = document.getElementById
     (
         "textareaDifferences"
     );
     textareaDifferences.innerHTML = differencesAsString;
       
 }
   
 // extensions
   
 ArrayExtensions=()=>
 {
     // extension class
 }
 {
     Array.prototype.insertElementAt = function(element, index)
     {
         this.splice(index, 0, element);
     }
   
     Array.prototype.insertElementsAt = function(elements, index)
     {
         for (var i = 0; i < elements.length; i++)
         {
             this.splice(index + i, 0, elements[i]);
         }
     }
   
     Array.prototype.removeAt = function(index)
     {
         this.splice(index, 1);
     }
 }
   
 // classes
   
 TextDifferencer=()=>
 {
     // do nothing
 }
 {
     TextDifferencer.prototype.findDifferencesBetweenStrings = function(string0, string1)
     {
         var lengthOfShorterString = 
             (string0.length <= string1.length ? string0.length : string1.length);
  
         var numberOfExtremes = 2;   
         var passagePairsMatchingAtExtremes = [];
      
         for (var e = 0; e < numberOfExtremes; e++)
         {
             var lengthOfMatchingSubstring = 0;
      
             for (var i = 0; i < lengthOfShorterString; i++)
             {
                 var offsetForString0 = (e == 0 ? i : string0.length - i - 1); 
                 var offsetForString1 = (e == 0 ? i : string1.length - i - 1);
  
                 var charFromString0 = string0[offsetForString0];
                 var charFromString1 = string1[offsetForString1];
      
                 if (charFromString0 != charFromString1)
                 {
                     lengthOfMatchingSubstring = i;
                     break;          
                 }   
             }
      
             var matchingSubstringAtExtreme;
  
             if (e == 0)
             {
                 matchingSubstringAtExtreme = string0.substr(0, lengthOfMatchingSubstring);
                 string0 = string0.substr(lengthOfMatchingSubstring);
                 string1 = string1.substr(lengthOfMatchingSubstring);
             } else // if (e == 1)
             {
                 matchingSubstringAtExtreme = string0.substr(string0.length - lengthOfMatchingSubstring);
                 string0 = string0.substr(0, string0.length - lengthOfMatchingSubstring);
                 string1 = string1.substr(0, string1.length - lengthOfMatchingSubstring);                
             }
  
             var passagePairMatchingAtExtreme = new TextPassagePair
             (
                 true, // doPassagesMatch
                 [
                     new TextPassage(matchingSubstringAtExtreme),
                     new TextPassage(matchingSubstringAtExtreme),
                 ]
             );
  
             passagePairsMatchingAtExtremes.push
             (
                 passagePairMatchingAtExtreme
             );
         }
  
         var passagePairsAll = [];
   
         var passagePairsMatching = this.findPassagePairsMatchingBetweenStrings
         (
             string0, string1, [ 0, 0 ]
         );
   
         this.insertPassagePairsDifferentBetweenMatching
         (
             string0,
             string1,
             passagePairsMatching,
             passagePairsAll
         );
  
         for (var e = 0; e < passagePairsMatchingAtExtremes.length; e++)
         {
             var passagePairMatchingAtExtreme = passagePairsMatchingAtExtremes[e];
             passagePairsAll.insertElementAt
             (
                 passagePairMatchingAtExtreme, 
                 (e == 0 ? 0 : passagePairsAll.length)
             );
         }
           
         var returnValue = new TextDifferences(passagePairsAll);
   
         return returnValue;
     }
   
     TextDifferencer.prototype.findPassagePairsMatchingBetweenStrings = function
     (
         string0, string1, positionOffsets
     )
     {
         var passagePairsMatching = [];
   
         var longestCommonPassagePair = this.findLongestCommonPassagePair
         (
             string0, 
             string1
         );
   
         var longestCommonPassageText = longestCommonPassagePair.passages[0].text;
         var lengthOfCommonPassage = longestCommonPassageText.length;
   
         if (lengthOfCommonPassage == 0)
         {
             return passagePairsMatching;    
         }
   
         passagePairsMatching.push(longestCommonPassagePair);
   
         var passages = longestCommonPassagePair.passages;
         var passage0 = passages[0];
         var passage1 = passages[1];
   
         var passagePairsMatchingBeforeCommon = this.findPassagePairsMatchingBetweenStrings
         (
             string0.substr(0, passage0.position),
             string1.substr(0, passage1.position),
             [
                 positionOffsets[0], 
                 positionOffsets[1]
             ]
         );
   
         var passagePairsMatchingAfterCommon = this.findPassagePairsMatchingBetweenStrings
         (
             string0.substr
             (
                 passage0.position + lengthOfCommonPassage
             ),
             string1.substr
             (
                 passage1.position + lengthOfCommonPassage
             ),
             [
                 positionOffsets[0] 
                     + passage0.position 
                     + lengthOfCommonPassage,
   
                 positionOffsets[1] 
                     + passage1.position 
                     + lengthOfCommonPassage
             ]
         );
   
         var passagePairSetsMatchingBeforeAndAfter = 
         [
             passagePairsMatchingBeforeCommon,
             passagePairsMatchingAfterCommon
         ];
   
         for (var i = 0; i < passagePairSetsMatchingBeforeAndAfter.length; i++)
         {
             var passagePairsToInsert = passagePairSetsMatchingBeforeAndAfter[i];
             passagePairsMatching.insertElementsAt
             (          
                 passagePairsToInsert,
                 (i == 0 ? 0 : passagePairsMatching.length)
             );
         }
   
         for (var i = 0; i < longestCommonPassagePair.passages.length; i++)
         {
             var passage = longestCommonPassagePair.passages[i];
             passage.position += positionOffsets[i];
         }
   
         return passagePairsMatching;
     }
   
     TextDifferencer.prototype.findLongestCommonPassagePair = function(string0, string1)
     {
         var passage0 = new TextPassage("", 0);
         var passage1 = new TextPassage("", 0);
   
         var returnValue = new TextPassagePair
         (
             true, // doPassagesMatch
             [
                 passage0, passage1
             ]
         );
   
         var lengthOfString0 = string0.length;
         var lengthOfString1 = string1.length;
   
         var substringLengthsForRow = null;
         var substringLengthsForRowPrev;
   
         var lengthOfLongestCommonSubstringSoFar = 0;
         var longestCommonSubstringsSoFar = "";
         var cellIndex = 0;
   
         // Build a table whose y-axis is chars from string0,
         // and whose x-axis is chars from string1.
         // Put length of the longest substring in each cell.
   
         for (var i = 0; i < lengthOfString0; i++)
         {
             substringLengthsForRowPrev = substringLengthsForRow;
             substringLengthsForRow = [];
   
             for (var j = 0; j < lengthOfString1; j++)
             {
                 if (string0[i] != string1[j])
                 {
                     substringLengthsForRow[j] = 0;
                 }
                 else 
                 {
                     var cellValue;
   
                     if (i == 0 || j == 0)
                     {
                         // first row or column
                         cellValue = 1;
                     }
                     else
                     {
                         // Copy cell to upper left, add 1.
                         cellValue = substringLengthsForRowPrev[j - 1] + 1;
                     }
   
                     substringLengthsForRow[j] = cellValue;
   
                     if (cellValue > lengthOfLongestCommonSubstringSoFar)
                     {
                         lengthOfLongestCommonSubstringSoFar = cellValue;
                         var startIndex = i - lengthOfLongestCommonSubstringSoFar + 1;
                         var longestCommonSubstringSoFar = string0.substring // not "substr"!
                         (
                             startIndex, 
                             i + 1
                         );
   
                         passage0.text = longestCommonSubstringSoFar;
                         passage0.position = startIndex;
   
                         passage1.text = longestCommonSubstringSoFar;
                         passage1.position = j - lengthOfLongestCommonSubstringSoFar + 1;
                     }
                 }
             }
         }
   
         return returnValue;
     }
   
     TextDifferencer.prototype.insertPassagePairsDifferentBetweenMatching = function
     (
         string0,
         string1,
         passagePairsToInsertBetween,
         passagePairsAll
     )
     {   
         passagePairsToInsertBetween.insertElementAt
         (
             new TextPassagePair
             (
                 true, // doPassagesMatch
                 [
                     new TextPassage("", 0),
                     new TextPassage("", 0)
                 ]
             ),
             0
         );
   
         passagePairsToInsertBetween.push
         (
             new TextPassagePair
             (
                 true, // doPassagesMatch
                 [
                     new TextPassage("", string0.length),
                     new TextPassage("", string1.length)
                 ]
             )
         );
   
         var pMax = passagePairsToInsertBetween.length - 1;
   
         for (var p = 0; p < pMax; p++)
         {
             passagePairToInsertAfter = passagePairsToInsertBetween[p];
             passagePairToInsertBefore = passagePairsToInsertBetween[p + 1];
   
             this.buildAndInsertPassagePairBetweenExisting
             (
                 string0,
                 string1,
                 passagePairToInsertBefore,
                 passagePairToInsertAfter,
                 passagePairsAll
             );
   
             passagePairsAll.push(passagePairToInsertBefore);
         }
   
         var indexOfPassagePairFinal = passagePairsAll.length - 1;
   
         var passagePairFinal = passagePairsAll[indexOfPassagePairFinal];
   
         if 
         (
             passagePairFinal.doPassagesMatch == true 
             && passagePairFinal.passages[0].text.length == 0
         )
         {
             passagePairsAll.removeAt(indexOfPassagePairFinal, 1);
         }
     }
   
     TextDifferencer.prototype.buildAndInsertPassagePairBetweenExisting = function
     (
         string0, 
         string1, 
         passagePairToInsertBefore, 
         passagePairToInsertAfter,
         passagePairsAll
     )
     {
         var lengthOfPassageToInsertAfter = passagePairToInsertAfter.passages[0].text.length;
   
         var positionsForPassagePairDifferent = 
         [
             [
                 passagePairToInsertAfter.passages[0].position 
                     + lengthOfPassageToInsertAfter,
   
                 passagePairToInsertAfter.passages[1].position 
                     + lengthOfPassageToInsertAfter
             ],        
             [
                 passagePairToInsertBefore.passages[0].position,
                 passagePairToInsertBefore.passages[1].position
             ]          
         ];
   
         var passageToInsert0 =  new TextPassage
         (
             string0.substring // not "substr"!
             (
                 positionsForPassagePairDifferent[0][0], 
                 positionsForPassagePairDifferent[1][0]
             ),
             positionsForPassagePairDifferent[0][0]
         );
   
         var passageToInsert1 = new TextPassage
         (
             string1.substring  // not "substr"!
             (
                 positionsForPassagePairDifferent[0][1], 
                 positionsForPassagePairDifferent[1][1]
             ),
             positionsForPassagePairDifferent[0][1]
         );
   
         var passagePairToInsert = new TextPassagePair
         (
             false, // doPassagesMatch
             [
                 passageToInsert0,
                 passageToInsert1
             ]
         );
   
         if 
         (
             passagePairToInsert.passages[0].text.length > 0
             || passagePairToInsert.passages[1].text.length > 0
         )
         {
             passagePairsAll.push(passagePairToInsert);
         }
   
     } 
 }
  
  TextDifferences=(passagePairs)=>
 {
     this.passagePairs = passagePairs;
 }
 {
     // instance methods
   
     TextDifferences.prototype.toString = function()
     {
         var returnValue = "";
   
         for (var p = 0; p < this.passagePairs.length; p++)
         {
             var passagePair = this.passagePairs[p];
             var passagePairAsString = passagePair.toString();
   
             returnValue += passagePairAsString;
         }
   
         return returnValue; 
     }   
  
 }
   
TextPassage=(text, position)=>
 {
     this.text = text;
     this.position = position;
 }
   
 TextPassagePair=(doPassagesMatch, passages)=>
 {
     this.doPassagesMatch = doPassagesMatch;
     this.passages = passages;   
 }
 {
     TextPassagePair.prototype.toString = function()
     {
         var returnValue = "";
   
         if (this.doPassagesMatch == true)
         {
             returnValue = this.passages[0].text;
             returnValue = this.escapeStringForHTML(returnValue);
         }
         else
         {
             returnValue += "<mark style='background-color:red'>";
             returnValue += this.escapeStringForHTML(this.passages[0].text);
             returnValue += "</mark><mark style='background-color:yellow'>";
             returnValue += this.escapeStringForHTML(this.passages[1].text);
             returnValue += "</mark>"; 
   
         }
   
         return returnValue;
     }
  
     TextPassagePair.prototype.escapeStringForHTML = function(stringToEscape)
     {
         var returnValue = stringToEscape.replace
         (
             "&", "&amp;"
         ).replace
         (
             "<", "&lt;"
         ).replace
         (
             ">", "&gt;"
         ).replace
         (
             "\n", "<br />"
         );
  
         return returnValue;
     }
 }

 render()
 {
  return(
   <div>
   <div>
        <label>New Version:</label>
        <br/>
        <textarea id="textareaBefore" cols="80" rows="10">

        </textarea>
    </div>
  
    <div>
        <label>Prev Version:</label>
        <br />
        <textarea id="textareaAfter" cols="80" rows="10">
helloo new changes
        </textarea>
    </div>
  
    <button id="buttonCompare" onclick="buttonCompareClicked();">Compare</button>
  
    <div>
        <label>Differences:</label>
        <br/>
        <div id="textareaDifferences" ></div>
    </div>

    </div>

  
  )
 }
}
export default Compare; */