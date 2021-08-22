<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:8a2a52cd-fd43-4274-9164-8b08790f6925(BusinessDsl.intentions)">
  <persistence version="9" />
  <languages>
    <use id="d7a92d38-f7db-40d0-8431-763b0c3c9f20" name="jetbrains.mps.lang.intentions" version="1" />
    <devkit ref="fbc25dd2-5da4-483a-8b19-70928e1b62d7(jetbrains.mps.devkit.general-purpose)" />
  </languages>
  <imports>
    <import index="epnx" ref="r:f19c86b6-a649-477a-978e-ed78d81f87d9(BusinessDsl.structure)" implicit="true" />
  </imports>
  <registry>
    <language id="f3061a53-9226-4cc5-a443-f952ceaf5816" name="jetbrains.mps.baseLanguage">
      <concept id="1082485599095" name="jetbrains.mps.baseLanguage.structure.BlockStatement" flags="nn" index="9aQIb">
        <child id="1082485599096" name="statements" index="9aQI4" />
      </concept>
      <concept id="1215693861676" name="jetbrains.mps.baseLanguage.structure.BaseAssignmentExpression" flags="nn" index="d038R">
        <child id="1068498886297" name="rValue" index="37vLTx" />
        <child id="1068498886295" name="lValue" index="37vLTJ" />
      </concept>
      <concept id="1197027756228" name="jetbrains.mps.baseLanguage.structure.DotExpression" flags="nn" index="2OqwBi">
        <child id="1197027771414" name="operand" index="2Oq$k0" />
        <child id="1197027833540" name="operation" index="2OqNvi" />
      </concept>
      <concept id="1145552977093" name="jetbrains.mps.baseLanguage.structure.GenericNewExpression" flags="nn" index="2ShNRf">
        <child id="1145553007750" name="creator" index="2ShVmc" />
      </concept>
      <concept id="1137021947720" name="jetbrains.mps.baseLanguage.structure.ConceptFunction" flags="in" index="2VMwT0">
        <child id="1137022507850" name="body" index="2VODD2" />
      </concept>
      <concept id="1070475926800" name="jetbrains.mps.baseLanguage.structure.StringLiteral" flags="nn" index="Xl_RD">
        <property id="1070475926801" name="value" index="Xl_RC" />
      </concept>
      <concept id="1070534058343" name="jetbrains.mps.baseLanguage.structure.NullLiteral" flags="nn" index="10Nm6u" />
      <concept id="1068498886294" name="jetbrains.mps.baseLanguage.structure.AssignmentExpression" flags="nn" index="37vLTI" />
      <concept id="1068580123155" name="jetbrains.mps.baseLanguage.structure.ExpressionStatement" flags="nn" index="3clFbF">
        <child id="1068580123156" name="expression" index="3clFbG" />
      </concept>
      <concept id="1068580123159" name="jetbrains.mps.baseLanguage.structure.IfStatement" flags="nn" index="3clFbJ">
        <child id="1082485599094" name="ifFalseStatement" index="9aQIa" />
        <child id="1068580123160" name="condition" index="3clFbw" />
        <child id="1068580123161" name="ifTrue" index="3clFbx" />
      </concept>
      <concept id="1068580123136" name="jetbrains.mps.baseLanguage.structure.StatementList" flags="sn" stub="5293379017992965193" index="3clFbS">
        <child id="1068581517665" name="statement" index="3cqZAp" />
      </concept>
      <concept id="1068581242875" name="jetbrains.mps.baseLanguage.structure.PlusExpression" flags="nn" index="3cpWs3" />
      <concept id="1079359253375" name="jetbrains.mps.baseLanguage.structure.ParenthesizedExpression" flags="nn" index="1eOMI4">
        <child id="1079359253376" name="expression" index="1eOMHV" />
      </concept>
      <concept id="1081773326031" name="jetbrains.mps.baseLanguage.structure.BinaryOperation" flags="nn" index="3uHJSO">
        <child id="1081773367579" name="rightExpression" index="3uHU7w" />
        <child id="1081773367580" name="leftExpression" index="3uHU7B" />
      </concept>
      <concept id="1163668896201" name="jetbrains.mps.baseLanguage.structure.TernaryOperatorExpression" flags="nn" index="3K4zz7">
        <child id="1163668914799" name="condition" index="3K4Cdx" />
        <child id="1163668922816" name="ifTrue" index="3K4E3e" />
        <child id="1163668934364" name="ifFalse" index="3K4GZi" />
      </concept>
    </language>
    <language id="d7a92d38-f7db-40d0-8431-763b0c3c9f20" name="jetbrains.mps.lang.intentions">
      <concept id="1192794744107" name="jetbrains.mps.lang.intentions.structure.IntentionDeclaration" flags="ig" index="2S6QgY" />
      <concept id="1192794782375" name="jetbrains.mps.lang.intentions.structure.DescriptionBlock" flags="in" index="2S6ZIM" />
      <concept id="1192795911897" name="jetbrains.mps.lang.intentions.structure.ExecuteBlock" flags="in" index="2Sbjvc" />
      <concept id="1192796902958" name="jetbrains.mps.lang.intentions.structure.ConceptFunctionParameter_node" flags="nn" index="2Sf5sV" />
      <concept id="2522969319638091381" name="jetbrains.mps.lang.intentions.structure.BaseIntentionDeclaration" flags="ig" index="2ZfUlf">
        <reference id="2522969319638198290" name="forConcept" index="2ZfgGC" />
        <child id="2522969319638198291" name="executeFunction" index="2ZfgGD" />
        <child id="2522969319638093993" name="descriptionFunction" index="2ZfVej" />
      </concept>
    </language>
    <language id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel">
      <concept id="1171999116870" name="jetbrains.mps.lang.smodel.structure.Node_IsNullOperation" flags="nn" index="3w_OXm" />
      <concept id="1180636770613" name="jetbrains.mps.lang.smodel.structure.SNodeCreator" flags="nn" index="3zrR0B">
        <child id="1180636770616" name="createdType" index="3zrR0E" />
      </concept>
      <concept id="1138055754698" name="jetbrains.mps.lang.smodel.structure.SNodeType" flags="in" index="3Tqbb2">
        <reference id="1138405853777" name="concept" index="ehGHo" />
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
  <node concept="2S6QgY" id="2oYTVs3dW0Y">
    <property role="TrG5h" value="ToggleInitialValue" />
    <property role="3GE5qa" value="types" />
    <ref role="2ZfgGC" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
    <node concept="2S6ZIM" id="2oYTVs3dW0Z" role="2ZfVej">
      <node concept="3clFbS" id="2oYTVs3dW10" role="2VODD2">
        <node concept="3clFbF" id="2oYTVs3dW5U" role="3cqZAp">
          <node concept="3cpWs3" id="2oYTVs3dXQR" role="3clFbG">
            <node concept="Xl_RD" id="2oYTVs3dXSf" role="3uHU7w">
              <property role="Xl_RC" value=" Value" />
            </node>
            <node concept="1eOMI4" id="2oYTVs3dWc6" role="3uHU7B">
              <node concept="3K4zz7" id="2oYTVs3dXi2" role="1eOMHV">
                <node concept="Xl_RD" id="2oYTVs3dXsB" role="3K4E3e">
                  <property role="Xl_RC" value="Add" />
                </node>
                <node concept="Xl_RD" id="2oYTVs3dXu3" role="3K4GZi">
                  <property role="Xl_RC" value="Remove" />
                </node>
                <node concept="2OqwBi" id="2oYTVs3dWDM" role="3K4Cdx">
                  <node concept="2OqwBi" id="2oYTVs3dWoU" role="2Oq$k0">
                    <node concept="2Sf5sV" id="2oYTVs3dWcB" role="2Oq$k0" />
                    <node concept="3TrEf2" id="2oYTVs3dWy2" role="2OqNvi">
                      <ref role="3Tt5mk" to="epnx:2oYTVs3bY4B" resolve="value" />
                    </node>
                  </node>
                  <node concept="3w_OXm" id="2oYTVs3dWOP" role="2OqNvi" />
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
    </node>
    <node concept="2Sbjvc" id="2oYTVs3dW11" role="2ZfgGD">
      <node concept="3clFbS" id="2oYTVs3dW12" role="2VODD2">
        <node concept="3clFbJ" id="2oYTVs3dYeF" role="3cqZAp">
          <node concept="2OqwBi" id="2oYTVs3dYF9" role="3clFbw">
            <node concept="2OqwBi" id="2oYTVs3dYoK" role="2Oq$k0">
              <node concept="2Sf5sV" id="2oYTVs3dYf4" role="2Oq$k0" />
              <node concept="3TrEf2" id="2oYTVs3dYxI" role="2OqNvi">
                <ref role="3Tt5mk" to="epnx:2oYTVs3bY4B" resolve="value" />
              </node>
            </node>
            <node concept="3w_OXm" id="2oYTVs3dYO6" role="2OqNvi" />
          </node>
          <node concept="3clFbS" id="2oYTVs3dYeH" role="3clFbx">
            <node concept="3clFbF" id="2oYTVs3fcGO" role="3cqZAp">
              <node concept="37vLTI" id="2oYTVs3fdl0" role="3clFbG">
                <node concept="2ShNRf" id="2oYTVs3fdnq" role="37vLTx">
                  <node concept="3zrR0B" id="2oYTVs3fdno" role="2ShVmc">
                    <node concept="3Tqbb2" id="2oYTVs3fdnp" role="3zrR0E">
                      <ref role="ehGHo" to="epnx:2oYTVs3bY4D" resolve="Expression" />
                    </node>
                  </node>
                </node>
                <node concept="2OqwBi" id="2oYTVs3fcOG" role="37vLTJ">
                  <node concept="2Sf5sV" id="2oYTVs3fcGN" role="2Oq$k0" />
                  <node concept="3TrEf2" id="2oYTVs3fcXH" role="2OqNvi">
                    <ref role="3Tt5mk" to="epnx:2oYTVs3bY4B" resolve="value" />
                  </node>
                </node>
              </node>
            </node>
          </node>
          <node concept="9aQIb" id="2oYTVs3dYP8" role="9aQIa">
            <node concept="3clFbS" id="2oYTVs3dYP9" role="9aQI4">
              <node concept="3clFbF" id="2oYTVs3dYV6" role="3cqZAp">
                <node concept="37vLTI" id="2oYTVs3dZjJ" role="3clFbG">
                  <node concept="10Nm6u" id="2oYTVs3dZkq" role="37vLTx" />
                  <node concept="2OqwBi" id="2oYTVs3dZ2Y" role="37vLTJ">
                    <node concept="2Sf5sV" id="2oYTVs3dYV5" role="2Oq$k0" />
                    <node concept="3TrEf2" id="2oYTVs3dZbZ" role="2OqNvi">
                      <ref role="3Tt5mk" to="epnx:2oYTVs3bY4B" resolve="value" />
                    </node>
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
    </node>
  </node>
</model>

