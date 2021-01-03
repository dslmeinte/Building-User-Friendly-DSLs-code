<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:f8824d61-b863-44bd-a589-6dd79d47017f(BusinessDsl.editor)">
  <persistence version="9" />
  <languages>
    <use id="18bc6592-03a6-4e29-a83a-7ff23bde13ba" name="jetbrains.mps.lang.editor" version="14" />
    <devkit ref="fbc25dd2-5da4-483a-8b19-70928e1b62d7(jetbrains.mps.devkit.general-purpose)" />
  </languages>
  <imports>
    <import index="wqgz" ref="r:8b97a555-3587-49df-8d4b-762048e09ba9(BusinessDsl.behavior)" />
    <import index="epnx" ref="r:f19c86b6-a649-477a-978e-ed78d81f87d9(BusinessDsl.structure)" implicit="true" />
    <import index="tpck" ref="r:00000000-0000-4000-0000-011c89590288(jetbrains.mps.lang.core.structure)" implicit="true" />
  </imports>
  <registry>
    <language id="18bc6592-03a6-4e29-a83a-7ff23bde13ba" name="jetbrains.mps.lang.editor">
      <concept id="1071666914219" name="jetbrains.mps.lang.editor.structure.ConceptEditorDeclaration" flags="ig" index="24kQdi" />
      <concept id="1140524381322" name="jetbrains.mps.lang.editor.structure.CellModel_ListWithRole" flags="ng" index="2czfm3">
        <child id="1140524464360" name="cellLayout" index="2czzBx" />
      </concept>
      <concept id="1106270549637" name="jetbrains.mps.lang.editor.structure.CellLayout_Horizontal" flags="nn" index="2iRfu4" />
      <concept id="1106270571710" name="jetbrains.mps.lang.editor.structure.CellLayout_Vertical" flags="nn" index="2iRkQZ" />
      <concept id="1142886221719" name="jetbrains.mps.lang.editor.structure.QueryFunction_NodeCondition" flags="in" index="pkWqt" />
      <concept id="1142886811589" name="jetbrains.mps.lang.editor.structure.ConceptFunctionParameter_node" flags="nn" index="pncrf" />
      <concept id="1080736578640" name="jetbrains.mps.lang.editor.structure.BaseEditorComponent" flags="ig" index="2wURMF">
        <child id="1080736633877" name="cellModel" index="2wV5jI" />
      </concept>
      <concept id="1186402211651" name="jetbrains.mps.lang.editor.structure.StyleSheet" flags="ng" index="V5hpn">
        <child id="1186402402630" name="styles" index="V601i" />
      </concept>
      <concept id="1186403694788" name="jetbrains.mps.lang.editor.structure.ColorStyleClassItem" flags="ln" index="VaVBg">
        <property id="1186403713874" name="color" index="Vb096" />
        <child id="1186403803051" name="query" index="VblUZ" />
      </concept>
      <concept id="1186403751766" name="jetbrains.mps.lang.editor.structure.FontStyleStyleClassItem" flags="ln" index="Vb9p2">
        <property id="1186403771423" name="style" index="Vbekb" />
      </concept>
      <concept id="1186404549998" name="jetbrains.mps.lang.editor.structure.ForegroundColorStyleClassItem" flags="ln" index="VechU" />
      <concept id="1186414536763" name="jetbrains.mps.lang.editor.structure.BooleanStyleSheetItem" flags="ln" index="VOi$J">
        <property id="1186414551515" name="flag" index="VOm3f" />
      </concept>
      <concept id="1186414928363" name="jetbrains.mps.lang.editor.structure.SelectableStyleSheetItem" flags="ln" index="VPM3Z" />
      <concept id="1186414999511" name="jetbrains.mps.lang.editor.structure.UnderlinedStyleClassItem" flags="ln" index="VQ3r3">
        <property id="1214316229833" name="underlined" index="2USNnj" />
      </concept>
      <concept id="1214406454886" name="jetbrains.mps.lang.editor.structure.TextBackgroundColorStyleClassItem" flags="ln" index="30gYXW" />
      <concept id="1233758997495" name="jetbrains.mps.lang.editor.structure.PunctuationLeftStyleClassItem" flags="ln" index="11L4FC" />
      <concept id="1233759184865" name="jetbrains.mps.lang.editor.structure.PunctuationRightStyleClassItem" flags="ln" index="11LMrY" />
      <concept id="3383245079137382180" name="jetbrains.mps.lang.editor.structure.StyleClass" flags="ig" index="14StLt" />
      <concept id="8313721352726366579" name="jetbrains.mps.lang.editor.structure.CellModel_Empty" flags="ng" index="35HoNQ" />
      <concept id="1088013125922" name="jetbrains.mps.lang.editor.structure.CellModel_RefCell" flags="sg" stub="730538219795941030" index="1iCGBv">
        <child id="1088186146602" name="editorComponent" index="1sWHZn" />
      </concept>
      <concept id="1225456267680" name="jetbrains.mps.lang.editor.structure.RGBColor" flags="ng" index="1iSF2X">
        <property id="1225456424731" name="value" index="1iTho6" />
      </concept>
      <concept id="1381004262292414836" name="jetbrains.mps.lang.editor.structure.ICellStyle" flags="ng" index="1k5N5V">
        <reference id="1381004262292426837" name="parentStyleClass" index="1k5W1q" />
      </concept>
      <concept id="1088185857835" name="jetbrains.mps.lang.editor.structure.InlineEditorComponent" flags="ig" index="1sVBvm" />
      <concept id="1139848536355" name="jetbrains.mps.lang.editor.structure.CellModel_WithRole" flags="ng" index="1$h60E">
        <property id="1139852716018" name="noTargetText" index="1$x2rV" />
        <property id="1140017977771" name="readOnly" index="1Intyy" />
        <reference id="1140103550593" name="relationDeclaration" index="1NtTu8" />
      </concept>
      <concept id="1073389214265" name="jetbrains.mps.lang.editor.structure.EditorCellModel" flags="ng" index="3EYTF0">
        <child id="1142887637401" name="renderingCondition" index="pqm2j" />
      </concept>
      <concept id="1073389446423" name="jetbrains.mps.lang.editor.structure.CellModel_Collection" flags="sn" stub="3013115976261988961" index="3EZMnI">
        <child id="1106270802874" name="cellLayout" index="2iSdaV" />
        <child id="1073389446424" name="childCellModel" index="3EZMnx" />
      </concept>
      <concept id="1073389577006" name="jetbrains.mps.lang.editor.structure.CellModel_Constant" flags="sn" stub="3610246225209162225" index="3F0ifn">
        <property id="1073389577007" name="text" index="3F0ifm" />
      </concept>
      <concept id="1073389658414" name="jetbrains.mps.lang.editor.structure.CellModel_Property" flags="sg" stub="730538219796134133" index="3F0A7n" />
      <concept id="1219418625346" name="jetbrains.mps.lang.editor.structure.IStyleContainer" flags="ng" index="3F0Thp">
        <child id="1219418656006" name="styleItem" index="3F10Kt" />
      </concept>
      <concept id="1073389882823" name="jetbrains.mps.lang.editor.structure.CellModel_RefNode" flags="sg" stub="730538219795960754" index="3F1sOY" />
      <concept id="1073390211982" name="jetbrains.mps.lang.editor.structure.CellModel_RefNodeList" flags="sg" stub="2794558372793454595" index="3F2HdR" />
      <concept id="1225898583838" name="jetbrains.mps.lang.editor.structure.ReadOnlyModelAccessor" flags="ng" index="1HfYo3">
        <child id="1225898971709" name="getter" index="1Hhtcw" />
      </concept>
      <concept id="1225900081164" name="jetbrains.mps.lang.editor.structure.CellModel_ReadOnlyModelAccessor" flags="sg" stub="3708815482283559694" index="1HlG4h">
        <child id="1225900141900" name="modelAccessor" index="1HlULh" />
      </concept>
      <concept id="1176717841777" name="jetbrains.mps.lang.editor.structure.QueryFunction_ModelAccess_Getter" flags="in" index="3TQlhw" />
      <concept id="1198256887712" name="jetbrains.mps.lang.editor.structure.CellModel_Indent" flags="ng" index="3XFhqQ" />
      <concept id="1166049232041" name="jetbrains.mps.lang.editor.structure.AbstractComponent" flags="ng" index="1XWOmA">
        <reference id="1166049300910" name="conceptDeclaration" index="1XX52x" />
      </concept>
    </language>
    <language id="f3061a53-9226-4cc5-a443-f952ceaf5816" name="jetbrains.mps.baseLanguage">
      <concept id="1197027756228" name="jetbrains.mps.baseLanguage.structure.DotExpression" flags="nn" index="2OqwBi">
        <child id="1197027771414" name="operand" index="2Oq$k0" />
        <child id="1197027833540" name="operation" index="2OqNvi" />
      </concept>
      <concept id="1137021947720" name="jetbrains.mps.baseLanguage.structure.ConceptFunction" flags="in" index="2VMwT0">
        <child id="1137022507850" name="body" index="2VODD2" />
      </concept>
      <concept id="1070475926800" name="jetbrains.mps.baseLanguage.structure.StringLiteral" flags="nn" index="Xl_RD">
        <property id="1070475926801" name="value" index="Xl_RC" />
      </concept>
      <concept id="1081236700937" name="jetbrains.mps.baseLanguage.structure.StaticMethodCall" flags="nn" index="2YIFZM">
        <reference id="1144433194310" name="classConcept" index="1Pybhc" />
      </concept>
      <concept id="1070534058343" name="jetbrains.mps.baseLanguage.structure.NullLiteral" flags="nn" index="10Nm6u" />
      <concept id="1068580123152" name="jetbrains.mps.baseLanguage.structure.EqualsExpression" flags="nn" index="3clFbC" />
      <concept id="1068580123155" name="jetbrains.mps.baseLanguage.structure.ExpressionStatement" flags="nn" index="3clFbF">
        <child id="1068580123156" name="expression" index="3clFbG" />
      </concept>
      <concept id="1068580123136" name="jetbrains.mps.baseLanguage.structure.StatementList" flags="sn" stub="5293379017992965193" index="3clFbS">
        <child id="1068581517665" name="statement" index="3cqZAp" />
      </concept>
      <concept id="1068581242875" name="jetbrains.mps.baseLanguage.structure.PlusExpression" flags="nn" index="3cpWs3" />
      <concept id="1204053956946" name="jetbrains.mps.baseLanguage.structure.IMethodCall" flags="ng" index="1ndlxa">
        <reference id="1068499141037" name="baseMethodDeclaration" index="37wK5l" />
        <child id="1068499141038" name="actualArgument" index="37wK5m" />
      </concept>
      <concept id="1081773326031" name="jetbrains.mps.baseLanguage.structure.BinaryOperation" flags="nn" index="3uHJSO">
        <child id="1081773367579" name="rightExpression" index="3uHU7w" />
        <child id="1081773367580" name="leftExpression" index="3uHU7B" />
      </concept>
    </language>
    <language id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel">
      <concept id="4705942098322609812" name="jetbrains.mps.lang.smodel.structure.EnumMember_IsOperation" flags="ng" index="21noJN">
        <child id="4705942098322609813" name="member" index="21noJM" />
      </concept>
      <concept id="4705942098322467729" name="jetbrains.mps.lang.smodel.structure.EnumMemberReference" flags="ng" index="21nZrQ">
        <reference id="4705942098322467736" name="decl" index="21nZrZ" />
      </concept>
      <concept id="1966870290083281362" name="jetbrains.mps.lang.smodel.structure.EnumMember_NameOperation" flags="ng" index="24Tkf9" />
      <concept id="1177026924588" name="jetbrains.mps.lang.smodel.structure.RefConcept_Reference" flags="nn" index="chp4Y">
        <reference id="1177026940964" name="conceptDeclaration" index="cht4Q" />
      </concept>
      <concept id="2396822768958367367" name="jetbrains.mps.lang.smodel.structure.AbstractTypeCastExpression" flags="nn" index="$5XWr">
        <child id="6733348108486823193" name="leftExpression" index="1m5AlR" />
        <child id="3906496115198199033" name="conceptArgument" index="3oSUPX" />
      </concept>
      <concept id="1139613262185" name="jetbrains.mps.lang.smodel.structure.Node_GetParentOperation" flags="nn" index="1mfA1w" />
      <concept id="1172008320231" name="jetbrains.mps.lang.smodel.structure.Node_IsNotNullOperation" flags="nn" index="3x8VRR" />
      <concept id="1140137987495" name="jetbrains.mps.lang.smodel.structure.SNodeTypeCastExpression" flags="nn" index="1PxgMI">
        <property id="1238684351431" name="asCast" index="1BlNFB" />
      </concept>
      <concept id="1138056022639" name="jetbrains.mps.lang.smodel.structure.SPropertyAccess" flags="nn" index="3TrcHB">
        <reference id="1138056395725" name="property" index="3TsBF5" />
      </concept>
      <concept id="1138056143562" name="jetbrains.mps.lang.smodel.structure.SLinkAccess" flags="nn" index="3TrEf2">
        <reference id="1138056516764" name="link" index="3Tt5mk" />
      </concept>
    </language>
    <language id="ceab5195-25ea-4f22-9b92-103b95ca8c0c" name="jetbrains.mps.lang.core">
      <concept id="1133920641626" name="jetbrains.mps.lang.core.structure.BaseConcept" flags="ng" index="2VYdi">
        <property id="1193676396447" name="virtualPackage" index="3GE5qa" />
      </concept>
      <concept id="1169194658468" name="jetbrains.mps.lang.core.structure.INamedConcept" flags="ng" index="TrEIO">
        <property id="1169194664001" name="name" index="TrG5h" />
      </concept>
    </language>
  </registry>
  <node concept="24kQdi" id="2oYTVs3bY3d">
    <property role="3GE5qa" value="types" />
    <ref role="1XX52x" to="epnx:2oYTVs3bUDZ" resolve="RecordType" />
    <node concept="3EZMnI" id="2oYTVs3bY3f" role="2wV5jI">
      <node concept="3EZMnI" id="2oYTVs3bY3m" role="3EZMnx">
        <node concept="VPM3Z" id="2oYTVs3bY3o" role="3F10Kt" />
        <node concept="3F0ifn" id="2oYTVs3bY3w" role="3EZMnx">
          <property role="3F0ifm" value="Record Type" />
        </node>
        <node concept="3F0A7n" id="2oYTVs3bY3A" role="3EZMnx">
          <ref role="1NtTu8" to="tpck:h0TrG11" resolve="name" />
          <ref role="1k5W1q" node="2oYTVs3eBNu" resolve="Editable" />
        </node>
        <node concept="2iRfu4" id="2oYTVs3bY3r" role="2iSdaV" />
      </node>
      <node concept="3F0ifn" id="2oYTVs3bY3E" role="3EZMnx" />
      <node concept="3EZMnI" id="2oYTVs3dJPv" role="3EZMnx">
        <node concept="VPM3Z" id="2oYTVs3dJPx" role="3F10Kt" />
        <node concept="3XFhqQ" id="2oYTVs3dJPU" role="3EZMnx" />
        <node concept="3EZMnI" id="2oYTVs3bY3T" role="3EZMnx">
          <node concept="VPM3Z" id="2oYTVs3bY3V" role="3F10Kt" />
          <node concept="3F0ifn" id="2oYTVs3bY3X" role="3EZMnx">
            <property role="3F0ifm" value="attributes:" />
          </node>
          <node concept="3EZMnI" id="2oYTVs3dJQr" role="3EZMnx">
            <node concept="VPM3Z" id="2oYTVs3dJQt" role="3F10Kt" />
            <node concept="3XFhqQ" id="2oYTVs3dJQG" role="3EZMnx" />
            <node concept="3EZMnI" id="2oYTVs3dJQM" role="3EZMnx">
              <node concept="VPM3Z" id="2oYTVs3dJQO" role="3F10Kt" />
              <node concept="3F2HdR" id="2oYTVs3dJR0" role="3EZMnx">
                <ref role="1NtTu8" to="epnx:2oYTVs3bY4_" resolve="attributes" />
                <node concept="2iRkQZ" id="2oYTVs3dJR2" role="2czzBx" />
              </node>
              <node concept="2iRkQZ" id="2oYTVs3dJQR" role="2iSdaV" />
            </node>
            <node concept="2iRfu4" id="2oYTVs3dJQw" role="2iSdaV" />
          </node>
          <node concept="35HoNQ" id="2oYTVs3fhON" role="3EZMnx" />
          <node concept="2iRkQZ" id="2oYTVs3bY3Y" role="2iSdaV" />
        </node>
        <node concept="2iRfu4" id="2oYTVs3dJP$" role="2iSdaV" />
      </node>
      <node concept="2iRkQZ" id="2oYTVs3bY3i" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="2oYTVs3bY4Q">
    <property role="3GE5qa" value="types" />
    <ref role="1XX52x" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
    <node concept="3EZMnI" id="2oYTVs3bY4S" role="2wV5jI">
      <node concept="3F0ifn" id="2oYTVs3ecpx" role="3EZMnx">
        <property role="3F0ifm" value="the" />
        <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
      </node>
      <node concept="3F0A7n" id="2oYTVs3c7bS" role="3EZMnx">
        <property role="1$x2rV" value="&lt;name&gt;" />
        <ref role="1NtTu8" to="tpck:h0TrG11" resolve="name" />
        <ref role="1k5W1q" node="2oYTVs3eBNu" resolve="Editable" />
      </node>
      <node concept="1HlG4h" id="2oYTVs3c7dC" role="3EZMnx">
        <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
        <node concept="1HfYo3" id="2oYTVs3c7dE" role="1HlULh">
          <node concept="3TQlhw" id="2oYTVs3c7dG" role="1Hhtcw">
            <node concept="3clFbS" id="2oYTVs3c7dI" role="2VODD2">
              <node concept="3clFbF" id="2oYTVs3c7eY" role="3cqZAp">
                <node concept="3cpWs3" id="2oYTVs3c7xE" role="3clFbG">
                  <node concept="2YIFZM" id="2oYTVs3c7B$" role="3uHU7w">
                    <ref role="37wK5l" to="wqgz:7QeWzul4tIt" resolve="indefiniteArticle" />
                    <ref role="1Pybhc" to="wqgz:7QeWzul4tHf" resolve="TextUtils" />
                    <node concept="2OqwBi" id="2oYTVs3c8oL" role="37wK5m">
                      <node concept="2OqwBi" id="2oYTVs3c81N" role="2Oq$k0">
                        <node concept="pncrf" id="2oYTVs3c7L1" role="2Oq$k0" />
                        <node concept="3TrcHB" id="2oYTVs3c8d4" role="2OqNvi">
                          <ref role="3TsBF5" to="epnx:2oYTVs3bXo5" resolve="type" />
                        </node>
                      </node>
                      <node concept="24Tkf9" id="2oYTVs3c8At" role="2OqNvi" />
                    </node>
                  </node>
                  <node concept="Xl_RD" id="2oYTVs3c7eX" role="3uHU7B">
                    <property role="Xl_RC" value="is " />
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
      <node concept="3F0A7n" id="2oYTVs3c8Q5" role="3EZMnx">
        <property role="1$x2rV" value="&lt;type&gt;" />
        <ref role="1NtTu8" to="epnx:2oYTVs3bXo5" resolve="type" />
        <ref role="1k5W1q" node="2oYTVs3eBNu" resolve="Editable" />
        <node concept="Vb9p2" id="2oYTVs3eSYl" role="3F10Kt">
          <property role="Vbekb" value="g1_kEg4/ITALIC" />
        </node>
      </node>
      <node concept="3EZMnI" id="2oYTVs3c8U3" role="3EZMnx">
        <node concept="VPM3Z" id="2oYTVs3c8U5" role="3F10Kt" />
        <node concept="3F0ifn" id="2oYTVs3ca0L" role="3EZMnx">
          <property role="3F0ifm" value="initially" />
          <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
        </node>
        <node concept="3F1sOY" id="2oYTVs3ca26" role="3EZMnx">
          <ref role="1NtTu8" to="epnx:2oYTVs3bY4B" resolve="value" />
        </node>
        <node concept="2iRfu4" id="2oYTVs3c8U8" role="2iSdaV" />
        <node concept="pkWqt" id="2oYTVs3c8Wa" role="pqm2j">
          <node concept="3clFbS" id="2oYTVs3c8Wb" role="2VODD2">
            <node concept="3clFbF" id="2oYTVs3c905" role="3cqZAp">
              <node concept="2OqwBi" id="2oYTVs3c9CR" role="3clFbG">
                <node concept="2OqwBi" id="2oYTVs3c9dv" role="2Oq$k0">
                  <node concept="pncrf" id="2oYTVs3c904" role="2Oq$k0" />
                  <node concept="3TrEf2" id="2oYTVs3c9rX" role="2OqNvi">
                    <ref role="3Tt5mk" to="epnx:2oYTVs3bY4B" resolve="value" />
                  </node>
                </node>
                <node concept="3x8VRR" id="2oYTVs3c9Pw" role="2OqNvi" />
              </node>
            </node>
          </node>
        </node>
      </node>
      <node concept="2iRfu4" id="2oYTVs3bY4V" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="2oYTVs3ca3b">
    <property role="3GE5qa" value="expr" />
    <ref role="1XX52x" to="epnx:2oYTVs3bXo7" resolve="NumberLiteral" />
    <node concept="3EZMnI" id="2oYTVs3ca3d" role="2wV5jI">
      <node concept="3F0ifn" id="2oYTVs3ca3k" role="3EZMnx">
        <property role="3F0ifm" value="$" />
        <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
        <node concept="pkWqt" id="2oYTVs3ca3n" role="pqm2j">
          <node concept="3clFbS" id="2oYTVs3ca3o" role="2VODD2">
            <node concept="3clFbF" id="2oYTVs3ca7i" role="3cqZAp">
              <node concept="2OqwBi" id="2oYTVs3cbkN" role="3clFbG">
                <node concept="2OqwBi" id="2oYTVs3caPN" role="2Oq$k0">
                  <node concept="1PxgMI" id="2oYTVs3caE0" role="2Oq$k0">
                    <property role="1BlNFB" value="true" />
                    <node concept="chp4Y" id="2oYTVs3caEX" role="3oSUPX">
                      <ref role="cht4Q" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
                    </node>
                    <node concept="2OqwBi" id="2oYTVs3cakG" role="1m5AlR">
                      <node concept="pncrf" id="2oYTVs3ca7h" role="2Oq$k0" />
                      <node concept="1mfA1w" id="2oYTVs3cavB" role="2OqNvi" />
                    </node>
                  </node>
                  <node concept="3TrcHB" id="2oYTVs3cb6A" role="2OqNvi">
                    <ref role="3TsBF5" to="epnx:2oYTVs3bXo5" resolve="type" />
                  </node>
                </node>
                <node concept="21noJN" id="2oYTVs3cbwj" role="2OqNvi">
                  <node concept="21nZrQ" id="2oYTVs3cb$T" role="21noJM">
                    <ref role="21nZrZ" to="epnx:2oYTVs3bXnX" resolve="amount" />
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
        <node concept="11LMrY" id="3yMAGXdIgVR" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
      </node>
      <node concept="3F0A7n" id="2oYTVs3cbFD" role="3EZMnx">
        <ref role="1NtTu8" to="epnx:2oYTVs3bXo8" resolve="value" />
        <ref role="1k5W1q" node="2oYTVs3eBNu" resolve="Editable" />
      </node>
      <node concept="3F0ifn" id="2oYTVs3cbHR" role="3EZMnx">
        <property role="3F0ifm" value="%" />
        <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
        <node concept="pkWqt" id="2oYTVs3cbIZ" role="pqm2j">
          <node concept="3clFbS" id="2oYTVs3cbJ0" role="2VODD2">
            <node concept="3clFbF" id="2oYTVs3cbJ5" role="3cqZAp">
              <node concept="2OqwBi" id="2oYTVs3ccYP" role="3clFbG">
                <node concept="2OqwBi" id="2oYTVs3ccyf" role="2Oq$k0">
                  <node concept="1PxgMI" id="2oYTVs3ccmF" role="2Oq$k0">
                    <property role="1BlNFB" value="true" />
                    <node concept="chp4Y" id="2oYTVs3ccnC" role="3oSUPX">
                      <ref role="cht4Q" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
                    </node>
                    <node concept="2OqwBi" id="2oYTVs3cbSW" role="1m5AlR">
                      <node concept="pncrf" id="2oYTVs3cbJ4" role="2Oq$k0" />
                      <node concept="1mfA1w" id="2oYTVs3cc3R" role="2OqNvi" />
                    </node>
                  </node>
                  <node concept="3TrcHB" id="2oYTVs3ccJ7" role="2OqNvi">
                    <ref role="3TsBF5" to="epnx:2oYTVs3bXo5" resolve="type" />
                  </node>
                </node>
                <node concept="21noJN" id="2oYTVs3cdal" role="2OqNvi">
                  <node concept="21nZrQ" id="2oYTVs3cdeV" role="21noJM">
                    <ref role="21nZrZ" to="epnx:2oYTVs3bXnY" resolve="percentage" />
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
        <node concept="11L4FC" id="3yMAGXdIgV8" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
      </node>
      <node concept="2iRfu4" id="2oYTVs3ca3g" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="2oYTVs3cdot">
    <property role="3GE5qa" value="expr" />
    <ref role="1XX52x" to="epnx:2oYTVs3bY4E" resolve="AttributeReference" />
    <node concept="3EZMnI" id="2oYTVs3cdov" role="2wV5jI">
      <node concept="3F0ifn" id="2oYTVs3cdoA" role="3EZMnx">
        <property role="3F0ifm" value="the" />
        <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
      </node>
      <node concept="1iCGBv" id="2oYTVs3cdoG" role="3EZMnx">
        <ref role="1NtTu8" to="epnx:2oYTVs3bY4F" resolve="attribute" />
        <ref role="1k5W1q" node="2oYTVs3eBNu" resolve="Editable" />
        <node concept="1sVBvm" id="2oYTVs3cdoI" role="1sWHZn">
          <node concept="3F0A7n" id="2oYTVs3cdoQ" role="2wV5jI">
            <property role="1Intyy" value="true" />
            <ref role="1NtTu8" to="tpck:h0TrG11" resolve="name" />
            <ref role="1k5W1q" node="2oYTVs3fe8p" resolve="Link" />
          </node>
        </node>
      </node>
      <node concept="2iRfu4" id="2oYTVs3cdoy" role="2iSdaV" />
    </node>
  </node>
  <node concept="V5hpn" id="2oYTVs3ezFW">
    <property role="TrG5h" value="Styling" />
    <node concept="14StLt" id="2oYTVs3ezFZ" role="V601i">
      <property role="TrG5h" value="Keyword" />
      <node concept="Vb9p2" id="2oYTVs3ezG2" role="3F10Kt">
        <property role="Vbekb" value="g1_k_vY/BOLD" />
      </node>
      <node concept="VechU" id="2oYTVs3fEFJ" role="3F10Kt">
        <property role="Vb096" value="fLJRk5_/gray" />
      </node>
    </node>
    <node concept="14StLt" id="2oYTVs3eBNu" role="V601i">
      <property role="TrG5h" value="Editable" />
      <node concept="30gYXW" id="2oYTVs3eBNz" role="3F10Kt">
        <property role="Vb096" value="fLJRk5A/lightGray" />
        <node concept="1iSF2X" id="2oYTVs3f5mf" role="VblUZ">
          <property role="1iTho6" value="E4E4E4" />
        </node>
      </node>
    </node>
    <node concept="14StLt" id="2oYTVs3fe8p" role="V601i">
      <property role="TrG5h" value="Link" />
      <node concept="Vb9p2" id="2oYTVs3fhx$" role="3F10Kt">
        <property role="Vbekb" value="g1_kEg4/ITALIC" />
      </node>
      <node concept="VQ3r3" id="2oYTVs3frM5" role="3F10Kt">
        <property role="2USNnj" value="gtbM8PH/underlined" />
      </node>
      <node concept="VechU" id="2oYTVs3fe8x" role="3F10Kt">
        <property role="Vb096" value="fLwANPu/blue" />
      </node>
    </node>
  </node>
  <node concept="24kQdi" id="3yMAGXdFSOu">
    <property role="3GE5qa" value="rules" />
    <ref role="1XX52x" to="epnx:3yMAGXdFSNO" resolve="BusinessRule" />
    <node concept="3EZMnI" id="3yMAGXdFSOz" role="2wV5jI">
      <node concept="3EZMnI" id="3yMAGXdFSOE" role="3EZMnx">
        <node concept="VPM3Z" id="3yMAGXdFSOG" role="3F10Kt" />
        <node concept="3F0ifn" id="3yMAGXdFSOI" role="3EZMnx">
          <property role="3F0ifm" value="Given" />
          <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
        </node>
        <node concept="1HlG4h" id="3yMAGXdFSOV" role="3EZMnx">
          <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
          <node concept="1HfYo3" id="3yMAGXdFSOX" role="1HlULh">
            <node concept="3TQlhw" id="3yMAGXdFSOZ" role="1Hhtcw">
              <node concept="3clFbS" id="3yMAGXdFSP1" role="2VODD2">
                <node concept="3clFbF" id="3yMAGXdFSTE" role="3cqZAp">
                  <node concept="2YIFZM" id="3yMAGXdIrRx" role="3clFbG">
                    <ref role="1Pybhc" to="wqgz:7QeWzul4tHf" resolve="TextUtils" />
                    <ref role="37wK5l" to="wqgz:7QeWzul4tIt" resolve="indefiniteArticle" />
                    <node concept="2OqwBi" id="3yMAGXdIrRy" role="37wK5m">
                      <node concept="2OqwBi" id="3yMAGXdIrRz" role="2Oq$k0">
                        <node concept="pncrf" id="3yMAGXdIrR$" role="2Oq$k0" />
                        <node concept="3TrEf2" id="3yMAGXdIDBP" role="2OqNvi">
                          <ref role="3Tt5mk" to="epnx:3yMAGXdFSNP" resolve="context" />
                        </node>
                      </node>
                      <node concept="3TrcHB" id="3yMAGXdIEgt" role="2OqNvi">
                        <ref role="3TsBF5" to="tpck:h0TrG11" resolve="name" />
                      </node>
                    </node>
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
        <node concept="1iCGBv" id="3yMAGXdFSUi" role="3EZMnx">
          <ref role="1NtTu8" to="epnx:3yMAGXdFSNP" resolve="context" />
          <node concept="1sVBvm" id="3yMAGXdFSUk" role="1sWHZn">
            <node concept="3F0A7n" id="3yMAGXdFSUC" role="2wV5jI">
              <property role="1Intyy" value="true" />
              <ref role="1NtTu8" to="tpck:h0TrG11" resolve="name" />
              <ref role="1k5W1q" node="2oYTVs3fe8p" resolve="Link" />
            </node>
          </node>
        </node>
        <node concept="3F0ifn" id="3yMAGXdFSVK" role="3EZMnx">
          <property role="3F0ifm" value="," />
          <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
          <node concept="11L4FC" id="3yMAGXdGj_A" role="3F10Kt">
            <property role="VOm3f" value="true" />
          </node>
        </node>
        <node concept="2iRfu4" id="3yMAGXdFSOJ" role="2iSdaV" />
      </node>
      <node concept="3EZMnI" id="3yMAGXdFSUX" role="3EZMnx">
        <node concept="VPM3Z" id="3yMAGXdFSUZ" role="3F10Kt" />
        <node concept="3XFhqQ" id="3yMAGXdFSVn" role="3EZMnx" />
        <node concept="3F0ifn" id="3yMAGXdFSVt" role="3EZMnx">
          <property role="3F0ifm" value="when" />
          <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
        </node>
        <node concept="3F1sOY" id="3yMAGXdG1hx" role="3EZMnx">
          <ref role="1NtTu8" to="epnx:3yMAGXdFSNR" resolve="condition" />
        </node>
        <node concept="3F0ifn" id="3yMAGXdG1iD" role="3EZMnx">
          <property role="3F0ifm" value="," />
          <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
          <node concept="11L4FC" id="3yMAGXdGsR7" role="3F10Kt">
            <property role="VOm3f" value="true" />
          </node>
        </node>
        <node concept="2iRfu4" id="3yMAGXdFSV2" role="2iSdaV" />
      </node>
      <node concept="3EZMnI" id="3yMAGXdG1hW" role="3EZMnx">
        <node concept="VPM3Z" id="3yMAGXdG1hY" role="3F10Kt" />
        <node concept="3XFhqQ" id="3yMAGXdG1iq" role="3EZMnx" />
        <node concept="3F0ifn" id="3yMAGXdG1iw" role="3EZMnx">
          <property role="3F0ifm" value="then" />
          <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
        </node>
        <node concept="3F1sOY" id="3yMAGXdG1nv" role="3EZMnx">
          <ref role="1NtTu8" to="epnx:3yMAGXdFSO0" resolve="consequence" />
        </node>
        <node concept="3F0ifn" id="3yMAGXdG1nD" role="3EZMnx">
          <property role="3F0ifm" value="." />
          <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
          <node concept="11L4FC" id="3yMAGXdGsR9" role="3F10Kt">
            <property role="VOm3f" value="true" />
          </node>
        </node>
        <node concept="2iRfu4" id="3yMAGXdG1i1" role="2iSdaV" />
      </node>
      <node concept="3F0ifn" id="3yMAGXdHKie" role="3EZMnx" />
      <node concept="2iRkQZ" id="3yMAGXdFSOA" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="3yMAGXdG9U7">
    <property role="3GE5qa" value="rules" />
    <ref role="1XX52x" to="epnx:3yMAGXdG9TA" resolve="BusinessRulesSection" />
    <node concept="3EZMnI" id="3yMAGXdG9U9" role="2wV5jI">
      <node concept="3EZMnI" id="3yMAGXdG9Ua" role="3EZMnx">
        <node concept="VPM3Z" id="3yMAGXdG9Ub" role="3F10Kt" />
        <node concept="3F0ifn" id="3yMAGXdG9Uc" role="3EZMnx">
          <property role="3F0ifm" value="Business rules section:" />
        </node>
        <node concept="3F0A7n" id="3yMAGXdG9Ud" role="3EZMnx">
          <ref role="1k5W1q" node="2oYTVs3eBNu" resolve="Editable" />
          <ref role="1NtTu8" to="tpck:h0TrG11" resolve="name" />
        </node>
        <node concept="2iRfu4" id="3yMAGXdG9Ue" role="2iSdaV" />
      </node>
      <node concept="3F0ifn" id="3yMAGXdG9Uy" role="3EZMnx" />
      <node concept="3EZMnI" id="3yMAGXdG9Uz" role="3EZMnx">
        <node concept="VPM3Z" id="3yMAGXdG9U$" role="3F10Kt" />
        <node concept="3XFhqQ" id="3yMAGXdG9U_" role="3EZMnx" />
        <node concept="3EZMnI" id="3yMAGXdG9UA" role="3EZMnx">
          <node concept="VPM3Z" id="3yMAGXdG9UB" role="3F10Kt" />
          <node concept="3F2HdR" id="3yMAGXdG9UC" role="3EZMnx">
            <ref role="1NtTu8" to="epnx:3yMAGXdG9TF" resolve="businessRules" />
            <node concept="2iRkQZ" id="3yMAGXdG9UD" role="2czzBx" />
          </node>
          <node concept="2iRkQZ" id="3yMAGXdG9UE" role="2iSdaV" />
        </node>
        <node concept="2iRfu4" id="3yMAGXdG9UF" role="2iSdaV" />
      </node>
      <node concept="2iRkQZ" id="3yMAGXdG9UG" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="3yMAGXdGA4L">
    <property role="3GE5qa" value="expr" />
    <ref role="1XX52x" to="epnx:3yMAGXdGA4d" resolve="InfixOperationInvocation" />
    <node concept="3EZMnI" id="3yMAGXdGA4N" role="2wV5jI">
      <node concept="3F1sOY" id="3yMAGXdGA4X" role="3EZMnx">
        <ref role="1NtTu8" to="epnx:3yMAGXdGA4g" resolve="left" />
      </node>
      <node concept="3F0A7n" id="3yMAGXdGA53" role="3EZMnx">
        <ref role="1NtTu8" to="epnx:3yMAGXdGA4e" resolve="operation" />
        <ref role="1k5W1q" node="2oYTVs3eBNu" resolve="Editable" />
        <node concept="Vb9p2" id="3yMAGXdJb4D" role="3F10Kt">
          <property role="Vbekb" value="g1_kEg4/ITALIC" />
        </node>
      </node>
      <node concept="3F1sOY" id="3yMAGXdGA5g" role="3EZMnx">
        <ref role="1NtTu8" to="epnx:3yMAGXdGA4i" resolve="right" />
      </node>
      <node concept="2iRfu4" id="3yMAGXdGA4Q" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="3yMAGXdH6fo">
    <property role="3GE5qa" value="expr" />
    <ref role="1XX52x" to="epnx:3yMAGXdGVcS" resolve="TimeLiteral" />
    <node concept="3EZMnI" id="3yMAGXdHgwa" role="2wV5jI">
      <node concept="3F0ifn" id="3yMAGXdHqLs" role="3EZMnx">
        <property role="3F0ifm" value="=&gt;" />
        <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
        <node concept="pkWqt" id="3yMAGXdH_33" role="pqm2j">
          <node concept="3clFbS" id="3yMAGXdH_34" role="2VODD2">
            <node concept="3clFbF" id="3yMAGXdH_6Y" role="3cqZAp">
              <node concept="3clFbC" id="3yMAGXdH_ED" role="3clFbG">
                <node concept="10Nm6u" id="3yMAGXdH_JF" role="3uHU7w" />
                <node concept="2OqwBi" id="3yMAGXdH_ko" role="3uHU7B">
                  <node concept="pncrf" id="3yMAGXdH_6X" role="2Oq$k0" />
                  <node concept="3TrcHB" id="3yMAGXdH_vg" role="2OqNvi">
                    <ref role="3TsBF5" to="epnx:3yMAGXdGVd0" resolve="time" />
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
      <node concept="3F0A7n" id="3yMAGXdHgwh" role="3EZMnx">
        <ref role="1NtTu8" to="epnx:3yMAGXdGVd0" resolve="time" />
        <ref role="1k5W1q" node="2oYTVs3eBNu" resolve="Editable" />
      </node>
      <node concept="2iRfu4" id="3yMAGXdHgwd" role="2iSdaV" />
    </node>
  </node>
  <node concept="24kQdi" id="3yMAGXdHVdb">
    <property role="3GE5qa" value="rules" />
    <ref role="1XX52x" to="epnx:3yMAGXdHVcD" resolve="AddTo" />
    <node concept="3EZMnI" id="3yMAGXdHVdd" role="2wV5jI">
      <node concept="3F0ifn" id="3yMAGXdHVdk" role="3EZMnx">
        <property role="3F0ifm" value="add" />
        <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
      </node>
      <node concept="3F1sOY" id="3yMAGXdHVdu" role="3EZMnx">
        <ref role="1NtTu8" to="epnx:3yMAGXdHVcG" resolve="quantity" />
      </node>
      <node concept="3F0ifn" id="3yMAGXdI6ix" role="3EZMnx">
        <property role="3F0ifm" value="%" />
        <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
        <node concept="11L4FC" id="3yMAGXdJlBd" role="3F10Kt">
          <property role="VOm3f" value="true" />
        </node>
      </node>
      <node concept="3F0ifn" id="3yMAGXdHVdA" role="3EZMnx">
        <property role="3F0ifm" value="to" />
        <ref role="1k5W1q" node="2oYTVs3ezFZ" resolve="Keyword" />
      </node>
      <node concept="3F1sOY" id="3yMAGXdHVed" role="3EZMnx">
        <ref role="1NtTu8" to="epnx:3yMAGXdHVdZ" resolve="attributeRef" />
      </node>
      <node concept="2iRfu4" id="3yMAGXdHVdg" role="2iSdaV" />
    </node>
  </node>
</model>

