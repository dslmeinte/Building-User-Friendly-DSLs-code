<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:63369275-b650-4a2b-bd1f-9a4620bdf788(BusinessDsl.typesystem)">
  <persistence version="9" />
  <languages>
    <use id="7a5dda62-9140-4668-ab76-d5ed1746f2b2" name="jetbrains.mps.lang.typesystem" version="5" />
    <devkit ref="00000000-0000-4000-0000-1de82b3a4936(jetbrains.mps.devkit.aspect.typesystem)" />
  </languages>
  <imports>
    <import index="epnx" ref="r:f19c86b6-a649-477a-978e-ed78d81f87d9(BusinessDsl.structure)" />
    <import index="wqgz" ref="r:8b97a555-3587-49df-8d4b-762048e09ba9(BusinessDsl.behavior)" />
    <import index="tpck" ref="r:00000000-0000-4000-0000-011c89590288(jetbrains.mps.lang.core.structure)" />
    <import index="wyt6" ref="6354ebe7-c22a-4a0f-ac54-50b52ab9b065/java:java.lang(JDK/)" />
  </imports>
  <registry>
    <language id="f3061a53-9226-4cc5-a443-f952ceaf5816" name="jetbrains.mps.baseLanguage">
      <concept id="1082485599095" name="jetbrains.mps.baseLanguage.structure.BlockStatement" flags="nn" index="9aQIb">
        <child id="1082485599096" name="statements" index="9aQI4" />
      </concept>
      <concept id="4836112446988635817" name="jetbrains.mps.baseLanguage.structure.UndefinedType" flags="in" index="2jxLKc" />
      <concept id="1202948039474" name="jetbrains.mps.baseLanguage.structure.InstanceMethodCallOperation" flags="nn" index="liA8E" />
      <concept id="1197027756228" name="jetbrains.mps.baseLanguage.structure.DotExpression" flags="nn" index="2OqwBi">
        <child id="1197027771414" name="operand" index="2Oq$k0" />
        <child id="1197027833540" name="operation" index="2OqNvi" />
      </concept>
      <concept id="1070475926800" name="jetbrains.mps.baseLanguage.structure.StringLiteral" flags="nn" index="Xl_RD">
        <property id="1070475926801" name="value" index="Xl_RC" />
      </concept>
      <concept id="1081236700937" name="jetbrains.mps.baseLanguage.structure.StaticMethodCall" flags="nn" index="2YIFZM">
        <reference id="1144433194310" name="classConcept" index="1Pybhc" />
      </concept>
      <concept id="1070534058343" name="jetbrains.mps.baseLanguage.structure.NullLiteral" flags="nn" index="10Nm6u" />
      <concept id="1068431474542" name="jetbrains.mps.baseLanguage.structure.VariableDeclaration" flags="ng" index="33uBYm">
        <child id="1068431790190" name="initializer" index="33vP2m" />
      </concept>
      <concept id="1068498886296" name="jetbrains.mps.baseLanguage.structure.VariableReference" flags="nn" index="37vLTw">
        <reference id="1068581517664" name="variableDeclaration" index="3cqZAo" />
      </concept>
      <concept id="1225271177708" name="jetbrains.mps.baseLanguage.structure.StringType" flags="in" index="17QB3L" />
      <concept id="1225271283259" name="jetbrains.mps.baseLanguage.structure.NPEEqualsExpression" flags="nn" index="17R0WA" />
      <concept id="1225271369338" name="jetbrains.mps.baseLanguage.structure.IsEmptyOperation" flags="nn" index="17RlXB" />
      <concept id="4972933694980447171" name="jetbrains.mps.baseLanguage.structure.BaseVariableDeclaration" flags="ng" index="19Szcq">
        <child id="5680397130376446158" name="type" index="1tU5fm" />
      </concept>
      <concept id="1068580123155" name="jetbrains.mps.baseLanguage.structure.ExpressionStatement" flags="nn" index="3clFbF">
        <child id="1068580123156" name="expression" index="3clFbG" />
      </concept>
      <concept id="1068580123157" name="jetbrains.mps.baseLanguage.structure.Statement" flags="nn" index="3clFbH" />
      <concept id="1068580123159" name="jetbrains.mps.baseLanguage.structure.IfStatement" flags="nn" index="3clFbJ">
        <child id="1082485599094" name="ifFalseStatement" index="9aQIa" />
        <child id="1068580123160" name="condition" index="3clFbw" />
        <child id="1068580123161" name="ifTrue" index="3clFbx" />
      </concept>
      <concept id="1068580123136" name="jetbrains.mps.baseLanguage.structure.StatementList" flags="sn" stub="5293379017992965193" index="3clFbS">
        <child id="1068581517665" name="statement" index="3cqZAp" />
      </concept>
      <concept id="1068581242875" name="jetbrains.mps.baseLanguage.structure.PlusExpression" flags="nn" index="3cpWs3" />
      <concept id="1068581242864" name="jetbrains.mps.baseLanguage.structure.LocalVariableDeclarationStatement" flags="nn" index="3cpWs8">
        <child id="1068581242865" name="localVariableDeclaration" index="3cpWs9" />
      </concept>
      <concept id="1068581242863" name="jetbrains.mps.baseLanguage.structure.LocalVariableDeclaration" flags="nr" index="3cpWsn" />
      <concept id="1204053956946" name="jetbrains.mps.baseLanguage.structure.IMethodCall" flags="ng" index="1ndlxa">
        <reference id="1068499141037" name="baseMethodDeclaration" index="37wK5l" />
        <child id="1068499141038" name="actualArgument" index="37wK5m" />
      </concept>
      <concept id="1081773326031" name="jetbrains.mps.baseLanguage.structure.BinaryOperation" flags="nn" index="3uHJSO">
        <child id="1081773367579" name="rightExpression" index="3uHU7w" />
        <child id="1081773367580" name="leftExpression" index="3uHU7B" />
      </concept>
      <concept id="1073239437375" name="jetbrains.mps.baseLanguage.structure.NotEqualsExpression" flags="nn" index="3y3z36" />
      <concept id="1080120340718" name="jetbrains.mps.baseLanguage.structure.AndExpression" flags="nn" index="1Wc70l" />
    </language>
    <language id="fd392034-7849-419d-9071-12563d152375" name="jetbrains.mps.baseLanguage.closures">
      <concept id="1199569711397" name="jetbrains.mps.baseLanguage.closures.structure.ClosureLiteral" flags="nn" index="1bVj0M">
        <child id="1199569906740" name="parameter" index="1bW2Oz" />
        <child id="1199569916463" name="body" index="1bW5cS" />
      </concept>
    </language>
    <language id="7a5dda62-9140-4668-ab76-d5ed1746f2b2" name="jetbrains.mps.lang.typesystem">
      <concept id="1207055528241" name="jetbrains.mps.lang.typesystem.structure.WarningStatement" flags="nn" index="a7r0C">
        <child id="1207055552304" name="warningText" index="a7wSD" />
      </concept>
      <concept id="1175517767210" name="jetbrains.mps.lang.typesystem.structure.ReportErrorStatement" flags="nn" index="2MkqsV">
        <child id="1175517851849" name="errorString" index="2MkJ7o" />
      </concept>
      <concept id="1227096498176" name="jetbrains.mps.lang.typesystem.structure.PropertyMessageTarget" flags="ng" index="2ODE4t">
        <reference id="1227096521710" name="propertyDeclaration" index="2ODJFN" />
      </concept>
      <concept id="1227096620180" name="jetbrains.mps.lang.typesystem.structure.ReferenceMessageTarget" flags="ng" index="2OE7Q9">
        <reference id="1227096645744" name="linkDeclaration" index="2OEe5H" />
      </concept>
      <concept id="1195213580585" name="jetbrains.mps.lang.typesystem.structure.AbstractCheckingRule" flags="ig" index="18hYwZ">
        <child id="1195213635060" name="body" index="18ibNy" />
      </concept>
      <concept id="1195214364922" name="jetbrains.mps.lang.typesystem.structure.NonTypesystemRule" flags="ig" index="18kY7G" />
      <concept id="3937244445246642777" name="jetbrains.mps.lang.typesystem.structure.AbstractReportStatement" flags="ng" index="1urrMJ">
        <child id="3937244445246643443" name="messageTarget" index="1urrC5" />
        <child id="3937244445246642781" name="nodeToReport" index="1urrMF" />
      </concept>
      <concept id="1174642788531" name="jetbrains.mps.lang.typesystem.structure.ConceptReference" flags="ig" index="1YaCAy">
        <reference id="1174642800329" name="concept" index="1YaFvo" />
      </concept>
      <concept id="1174648085619" name="jetbrains.mps.lang.typesystem.structure.AbstractRule" flags="ng" index="1YuPPy">
        <child id="1174648101952" name="applicableNode" index="1YuTPh" />
      </concept>
      <concept id="1174650418652" name="jetbrains.mps.lang.typesystem.structure.ApplicableNodeReference" flags="nn" index="1YBJjd">
        <reference id="1174650432090" name="applicableNode" index="1YBMHb" />
      </concept>
    </language>
    <language id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel">
      <concept id="1177026924588" name="jetbrains.mps.lang.smodel.structure.RefConcept_Reference" flags="nn" index="chp4Y">
        <reference id="1177026940964" name="conceptDeclaration" index="cht4Q" />
      </concept>
      <concept id="1138411891628" name="jetbrains.mps.lang.smodel.structure.SNodeOperation" flags="nn" index="eCIE_">
        <child id="1144104376918" name="parameter" index="1xVPHs" />
      </concept>
      <concept id="1145383075378" name="jetbrains.mps.lang.smodel.structure.SNodeListType" flags="in" index="2I9FWS">
        <reference id="1145383142433" name="elementConcept" index="2I9WkF" />
      </concept>
      <concept id="1171407110247" name="jetbrains.mps.lang.smodel.structure.Node_GetAncestorOperation" flags="nn" index="2Xjw5R" />
      <concept id="1144101972840" name="jetbrains.mps.lang.smodel.structure.OperationParm_Concept" flags="ng" index="1xMEDy">
        <child id="1207343664468" name="conceptArgument" index="ri$Ld" />
      </concept>
      <concept id="1138055754698" name="jetbrains.mps.lang.smodel.structure.SNodeType" flags="in" index="3Tqbb2">
        <reference id="1138405853777" name="concept" index="ehGHo" />
      </concept>
      <concept id="1138056022639" name="jetbrains.mps.lang.smodel.structure.SPropertyAccess" flags="nn" index="3TrcHB">
        <reference id="1138056395725" name="property" index="3TsBF5" />
      </concept>
      <concept id="1138056143562" name="jetbrains.mps.lang.smodel.structure.SLinkAccess" flags="nn" index="3TrEf2">
        <reference id="1138056516764" name="link" index="3Tt5mk" />
      </concept>
      <concept id="1138056282393" name="jetbrains.mps.lang.smodel.structure.SLinkListAccess" flags="nn" index="3Tsc0h">
        <reference id="1138056546658" name="link" index="3TtcxE" />
      </concept>
    </language>
    <language id="ceab5195-25ea-4f22-9b92-103b95ca8c0c" name="jetbrains.mps.lang.core">
      <concept id="1169194658468" name="jetbrains.mps.lang.core.structure.INamedConcept" flags="ng" index="TrEIO">
        <property id="1169194664001" name="name" index="TrG5h" />
      </concept>
    </language>
    <language id="83888646-71ce-4f1c-9c53-c54016f6ad4f" name="jetbrains.mps.baseLanguage.collections">
      <concept id="1204796164442" name="jetbrains.mps.baseLanguage.collections.structure.InternalSequenceOperation" flags="nn" index="23sCx2">
        <child id="1204796294226" name="closure" index="23t8la" />
      </concept>
      <concept id="1151689724996" name="jetbrains.mps.baseLanguage.collections.structure.SequenceType" flags="in" index="A3Dl8">
        <child id="1151689745422" name="elementType" index="A3Ik2" />
      </concept>
      <concept id="1203518072036" name="jetbrains.mps.baseLanguage.collections.structure.SmartClosureParameterDeclaration" flags="ig" index="Rh6nW" />
      <concept id="1240687580870" name="jetbrains.mps.baseLanguage.collections.structure.JoinOperation" flags="nn" index="3uJxvA">
        <child id="1240687658305" name="delimiter" index="3uJOhx" />
      </concept>
      <concept id="1165530316231" name="jetbrains.mps.baseLanguage.collections.structure.IsEmptyOperation" flags="nn" index="1v1jN8" />
      <concept id="1202120902084" name="jetbrains.mps.baseLanguage.collections.structure.WhereOperation" flags="nn" index="3zZkjj" />
      <concept id="1202128969694" name="jetbrains.mps.baseLanguage.collections.structure.SelectOperation" flags="nn" index="3$u5V9" />
      <concept id="1176501494711" name="jetbrains.mps.baseLanguage.collections.structure.IsNotEmptyOperation" flags="nn" index="3GX2aA" />
    </language>
  </registry>
  <node concept="18kY7G" id="6aiAwNFMPvb">
    <property role="TrG5h" value="check_RecordType" />
    <node concept="3clFbS" id="6aiAwNFMPvc" role="18ibNy">
      <node concept="3clFbJ" id="6aiAwNFMPvn" role="3cqZAp">
        <node concept="2OqwBi" id="6aiAwNFMQ8o" role="3clFbw">
          <node concept="2OqwBi" id="6aiAwNFMPDe" role="2Oq$k0">
            <node concept="1YBJjd" id="6aiAwNFMPvz" role="2Oq$k0">
              <ref role="1YBMHb" node="6aiAwNFMPve" resolve="recordType" />
            </node>
            <node concept="3TrcHB" id="6aiAwNFMPLO" role="2OqNvi">
              <ref role="3TsBF5" to="tpck:h0TrG11" resolve="name" />
            </node>
          </node>
          <node concept="17RlXB" id="6aiAwNFMQy7" role="2OqNvi" />
        </node>
        <node concept="3clFbS" id="6aiAwNFMPvp" role="3clFbx">
          <node concept="2MkqsV" id="6aiAwNFMQyl" role="3cqZAp">
            <node concept="Xl_RD" id="6aiAwNFMQyx" role="2MkJ7o">
              <property role="Xl_RC" value="A record type must have a name" />
            </node>
            <node concept="1YBJjd" id="6aiAwNFMQzf" role="1urrMF">
              <ref role="1YBMHb" node="6aiAwNFMPve" resolve="recordType" />
            </node>
            <node concept="2ODE4t" id="6aiAwNFMQzO" role="1urrC5">
              <ref role="2ODJFN" to="tpck:h0TrG11" resolve="name" />
            </node>
          </node>
        </node>
      </node>
      <node concept="3clFbJ" id="6aiAwNFMQ$L" role="3cqZAp">
        <node concept="3clFbS" id="6aiAwNFMQ$N" role="3clFbx">
          <node concept="a7r0C" id="6aiAwNFMU_D" role="3cqZAp">
            <node concept="Xl_RD" id="6aiAwNFMU_Y" role="a7wSD">
              <property role="Xl_RC" value="A record type should have attributes" />
            </node>
            <node concept="1YBJjd" id="6aiAwNFMUAK" role="1urrMF">
              <ref role="1YBMHb" node="6aiAwNFMPve" resolve="recordType" />
            </node>
          </node>
        </node>
        <node concept="2OqwBi" id="6aiAwNFMSJD" role="3clFbw">
          <node concept="2OqwBi" id="6aiAwNFMQIQ" role="2Oq$k0">
            <node concept="1YBJjd" id="6aiAwNFMQ_b" role="2Oq$k0">
              <ref role="1YBMHb" node="6aiAwNFMPve" resolve="recordType" />
            </node>
            <node concept="3Tsc0h" id="6aiAwNFMQRP" role="2OqNvi">
              <ref role="3TtcxE" to="epnx:2oYTVs3bY4_" resolve="attributes" />
            </node>
          </node>
          <node concept="1v1jN8" id="6aiAwNFMU$U" role="2OqNvi" />
        </node>
      </node>
    </node>
    <node concept="1YaCAy" id="6aiAwNFMPve" role="1YuTPh">
      <property role="TrG5h" value="recordType" />
      <ref role="1YaFvo" to="epnx:2oYTVs3bUDZ" resolve="RecordType" />
    </node>
  </node>
  <node concept="18kY7G" id="6aiAwNFMUBl">
    <property role="TrG5h" value="check_NumberLiteral" />
    <node concept="3clFbS" id="6aiAwNFMUBm" role="18ibNy">
      <node concept="3clFbJ" id="6aiAwNFMUBx" role="3cqZAp">
        <node concept="2OqwBi" id="6aiAwNFMVgi" role="3clFbw">
          <node concept="2OqwBi" id="6aiAwNFMULo" role="2Oq$k0">
            <node concept="1YBJjd" id="6aiAwNFMUBH" role="2Oq$k0">
              <ref role="1YBMHb" node="6aiAwNFMUBo" resolve="numberLiteral" />
            </node>
            <node concept="3TrcHB" id="6aiAwNFMUTY" role="2OqNvi">
              <ref role="3TsBF5" to="epnx:2oYTVs3bXo8" resolve="value" />
            </node>
          </node>
          <node concept="17RlXB" id="6aiAwNFMVxq" role="2OqNvi" />
        </node>
        <node concept="3clFbS" id="6aiAwNFMUBz" role="3clFbx">
          <node concept="2MkqsV" id="6aiAwNFMVxE" role="3cqZAp">
            <node concept="Xl_RD" id="6aiAwNFMVxT" role="2MkJ7o">
              <property role="Xl_RC" value="A number literal must have a value" />
            </node>
            <node concept="1YBJjd" id="6aiAwNFMVyp" role="1urrMF">
              <ref role="1YBMHb" node="6aiAwNFMUBo" resolve="numberLiteral" />
            </node>
            <node concept="2ODE4t" id="6aiAwNFMVyY" role="1urrC5">
              <ref role="2ODJFN" to="epnx:2oYTVs3bXo8" resolve="value" />
            </node>
          </node>
        </node>
      </node>
    </node>
    <node concept="1YaCAy" id="6aiAwNFMUBo" role="1YuTPh">
      <property role="TrG5h" value="numberLiteral" />
      <ref role="1YaFvo" to="epnx:2oYTVs3bXo7" resolve="NumberLiteral" />
    </node>
  </node>
  <node concept="18kY7G" id="6aiAwNFMXcX">
    <property role="TrG5h" value="check_AttributeReference" />
    <node concept="3clFbS" id="6aiAwNFMXcY" role="18ibNy">
      <node concept="3cpWs8" id="6aiAwNFN3U_" role="3cqZAp">
        <node concept="3cpWsn" id="6aiAwNFN3UA" role="3cpWs9">
          <property role="TrG5h" value="otherAttribute" />
          <node concept="3Tqbb2" id="6aiAwNFN3Uy" role="1tU5fm">
            <ref role="ehGHo" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
          </node>
          <node concept="2OqwBi" id="6aiAwNFN3UB" role="33vP2m">
            <node concept="1YBJjd" id="6aiAwNFN3UC" role="2Oq$k0">
              <ref role="1YBMHb" node="6aiAwNFMXd0" resolve="attributeReference" />
            </node>
            <node concept="3TrEf2" id="6aiAwNFN3UD" role="2OqNvi">
              <ref role="3Tt5mk" to="epnx:2oYTVs3bY4F" resolve="attribute" />
            </node>
          </node>
        </node>
      </node>
      <node concept="3clFbJ" id="6aiAwNFMXd9" role="3cqZAp">
        <node concept="17R0WA" id="6aiAwNFN7v3" role="3clFbw">
          <node concept="37vLTw" id="6aiAwNFN3UF" role="3uHU7B">
            <ref role="3cqZAo" node="6aiAwNFN3UA" resolve="otherAttribute" />
          </node>
          <node concept="10Nm6u" id="6aiAwNFMXI_" role="3uHU7w" />
        </node>
        <node concept="3clFbS" id="6aiAwNFMXdb" role="3clFbx">
          <node concept="2MkqsV" id="6aiAwNFMXIR" role="3cqZAp">
            <node concept="Xl_RD" id="6aiAwNFMXJ3" role="2MkJ7o">
              <property role="Xl_RC" value="The attribute to reference is not yet specified" />
            </node>
            <node concept="1YBJjd" id="6aiAwNFMXJl" role="1urrMF">
              <ref role="1YBMHb" node="6aiAwNFMXd0" resolve="attributeReference" />
            </node>
            <node concept="2OE7Q9" id="6aiAwNFMXJz" role="1urrC5">
              <ref role="2OEe5H" to="epnx:2oYTVs3bY4F" resolve="attribute" />
            </node>
          </node>
        </node>
        <node concept="9aQIb" id="6aiAwNFMXMM" role="9aQIa">
          <node concept="3clFbS" id="6aiAwNFMXMN" role="9aQI4">
            <node concept="3cpWs8" id="6aiAwNFMYer" role="3cqZAp">
              <node concept="3cpWsn" id="6aiAwNFMYes" role="3cpWs9">
                <property role="TrG5h" value="thisAttribute" />
                <node concept="3Tqbb2" id="6aiAwNFMYat" role="1tU5fm">
                  <ref role="ehGHo" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
                </node>
                <node concept="2OqwBi" id="6aiAwNFMYet" role="33vP2m">
                  <node concept="1YBJjd" id="6aiAwNFMYeu" role="2Oq$k0">
                    <ref role="1YBMHb" node="6aiAwNFMXd0" resolve="attributeReference" />
                  </node>
                  <node concept="2Xjw5R" id="6aiAwNFMYev" role="2OqNvi">
                    <node concept="1xMEDy" id="6aiAwNFMYew" role="1xVPHs">
                      <node concept="chp4Y" id="6aiAwNFMYex" role="ri$Ld">
                        <ref role="cht4Q" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
                      </node>
                    </node>
                  </node>
                </node>
              </node>
            </node>
            <node concept="3clFbJ" id="6aiAwNFMYi4" role="3cqZAp">
              <node concept="3clFbS" id="6aiAwNFMYi6" role="3clFbx">
                <node concept="2MkqsV" id="6aiAwNFN03j" role="3cqZAp">
                  <node concept="1YBJjd" id="6aiAwNFN06_" role="1urrMF">
                    <ref role="1YBMHb" node="6aiAwNFMXd0" resolve="attributeReference" />
                  </node>
                  <node concept="2YIFZM" id="6aiAwNFN04u" role="2MkJ7o">
                    <ref role="37wK5l" to="wyt6:~String.format(java.lang.String,java.lang.Object...)" resolve="format" />
                    <ref role="1Pybhc" to="wyt6:~String" resolve="String" />
                    <node concept="3cpWs3" id="6aiAwNFN0_x" role="37wK5m">
                      <node concept="Xl_RD" id="6aiAwNFN0_$" role="3uHU7w">
                        <property role="Xl_RC" value="but they are: '%s', resp., '%s'" />
                      </node>
                      <node concept="Xl_RD" id="6aiAwNFN05z" role="3uHU7B">
                        <property role="Xl_RC" value="The types of this attribute and the attribute named '%s' must match, " />
                      </node>
                    </node>
                    <node concept="2OqwBi" id="6aiAwNFN1Mp" role="37wK5m">
                      <node concept="37vLTw" id="6aiAwNFN3UG" role="2Oq$k0">
                        <ref role="3cqZAo" node="6aiAwNFN3UA" resolve="otherAttribute" />
                      </node>
                      <node concept="3TrcHB" id="6aiAwNFN24t" role="2OqNvi">
                        <ref role="3TsBF5" to="tpck:h0TrG11" resolve="name" />
                      </node>
                    </node>
                    <node concept="2OqwBi" id="6aiAwNFN2mo" role="37wK5m">
                      <node concept="37vLTw" id="6aiAwNFN2jy" role="2Oq$k0">
                        <ref role="3cqZAo" node="6aiAwNFMYes" resolve="thisAttribute" />
                      </node>
                      <node concept="3TrcHB" id="6aiAwNFN2pR" role="2OqNvi">
                        <ref role="3TsBF5" to="epnx:2oYTVs3bXo5" resolve="type" />
                      </node>
                    </node>
                    <node concept="2OqwBi" id="6aiAwNFN3wd" role="37wK5m">
                      <node concept="37vLTw" id="6aiAwNFN3UH" role="2Oq$k0">
                        <ref role="3cqZAo" node="6aiAwNFN3UA" resolve="otherAttribute" />
                      </node>
                      <node concept="3TrcHB" id="6aiAwNFN3Hg" role="2OqNvi">
                        <ref role="3TsBF5" to="epnx:2oYTVs3bXo5" resolve="type" />
                      </node>
                    </node>
                  </node>
                  <node concept="2OE7Q9" id="6aiAwNFN07x" role="1urrC5">
                    <ref role="2OEe5H" to="epnx:2oYTVs3bY4F" resolve="attribute" />
                  </node>
                </node>
              </node>
              <node concept="1Wc70l" id="6aiAwNFMYKf" role="3clFbw">
                <node concept="3y3z36" id="6aiAwNFMZ6x" role="3uHU7w">
                  <node concept="2OqwBi" id="6aiAwNFMZX9" role="3uHU7w">
                    <node concept="37vLTw" id="6aiAwNFN3UI" role="2Oq$k0">
                      <ref role="3cqZAo" node="6aiAwNFN3UA" resolve="otherAttribute" />
                    </node>
                    <node concept="3TrcHB" id="6aiAwNFN01N" role="2OqNvi">
                      <ref role="3TsBF5" to="epnx:2oYTVs3bXo5" resolve="type" />
                    </node>
                  </node>
                  <node concept="2OqwBi" id="6aiAwNFMYLz" role="3uHU7B">
                    <node concept="37vLTw" id="6aiAwNFMYKZ" role="2Oq$k0">
                      <ref role="3cqZAo" node="6aiAwNFMYes" resolve="thisAttribute" />
                    </node>
                    <node concept="3TrcHB" id="6aiAwNFMYXa" role="2OqNvi">
                      <ref role="3TsBF5" to="epnx:2oYTVs3bXo5" resolve="type" />
                    </node>
                  </node>
                </node>
                <node concept="3y3z36" id="6aiAwNFMYJ_" role="3uHU7B">
                  <node concept="2OqwBi" id="6aiAwNFMYs6" role="3uHU7B">
                    <node concept="37vLTw" id="6aiAwNFMYir" role="2Oq$k0">
                      <ref role="3cqZAo" node="6aiAwNFMYes" resolve="thisAttribute" />
                    </node>
                    <node concept="3TrcHB" id="6aiAwNFMY$_" role="2OqNvi">
                      <ref role="3TsBF5" to="epnx:2oYTVs3bXo5" resolve="type" />
                    </node>
                  </node>
                  <node concept="10Nm6u" id="6aiAwNFMYJK" role="3uHU7w" />
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
    </node>
    <node concept="1YaCAy" id="6aiAwNFMXd0" role="1YuTPh">
      <property role="TrG5h" value="attributeReference" />
      <ref role="1YaFvo" to="epnx:2oYTVs3bY4E" resolve="AttributeReference" />
    </node>
  </node>
  <node concept="18kY7G" id="6aiAwNFNlZK">
    <property role="TrG5h" value="check_Attribute" />
    <node concept="3clFbS" id="6aiAwNFNlZL" role="18ibNy">
      <node concept="3clFbJ" id="6aiAwNFNlZW" role="3cqZAp">
        <node concept="2OqwBi" id="6aiAwNFNmEJ" role="3clFbw">
          <node concept="2OqwBi" id="6aiAwNFNm9N" role="2Oq$k0">
            <node concept="1YBJjd" id="6aiAwNFNm08" role="2Oq$k0">
              <ref role="1YBMHb" node="6aiAwNFNlZN" resolve="thisAttribute" />
            </node>
            <node concept="3TrcHB" id="6aiAwNFNmip" role="2OqNvi">
              <ref role="3TsBF5" to="tpck:h0TrG11" resolve="name" />
            </node>
          </node>
          <node concept="17RlXB" id="6aiAwNFNmTR" role="2OqNvi" />
        </node>
        <node concept="3clFbS" id="6aiAwNFNlZY" role="3clFbx">
          <node concept="2MkqsV" id="6aiAwNFNmU5" role="3cqZAp">
            <node concept="Xl_RD" id="6aiAwNFNmUh" role="2MkJ7o">
              <property role="Xl_RC" value="An attribute must have a name" />
            </node>
            <node concept="1YBJjd" id="6aiAwNFNmUz" role="1urrMF">
              <ref role="1YBMHb" node="6aiAwNFNlZN" resolve="thisAttribute" />
            </node>
            <node concept="2ODE4t" id="6aiAwNFNmUL" role="1urrC5">
              <ref role="2ODJFN" to="tpck:h0TrG11" resolve="name" />
            </node>
          </node>
        </node>
      </node>
      <node concept="3clFbJ" id="6aiAwNFNmVw" role="3cqZAp">
        <node concept="3clFbS" id="6aiAwNFNmVy" role="3clFbx">
          <node concept="2MkqsV" id="6aiAwNFNnwk" role="3cqZAp">
            <node concept="Xl_RD" id="6aiAwNFNnwz" role="2MkJ7o">
              <property role="Xl_RC" value="An attribute must have a type" />
            </node>
            <node concept="1YBJjd" id="6aiAwNFNnwP" role="1urrMF">
              <ref role="1YBMHb" node="6aiAwNFNlZN" resolve="thisAttribute" />
            </node>
            <node concept="2ODE4t" id="6aiAwNFNnxq" role="1urrC5">
              <ref role="2ODJFN" to="epnx:2oYTVs3bXo5" resolve="type" />
            </node>
          </node>
        </node>
        <node concept="17R0WA" id="6aiAwNFNnvp" role="3clFbw">
          <node concept="2OqwBi" id="6aiAwNFNn5_" role="3uHU7B">
            <node concept="1YBJjd" id="6aiAwNFNmVU" role="2Oq$k0">
              <ref role="1YBMHb" node="6aiAwNFNlZN" resolve="thisAttribute" />
            </node>
            <node concept="3TrcHB" id="6aiAwNFNngV" role="2OqNvi">
              <ref role="3TsBF5" to="epnx:2oYTVs3bXo5" resolve="type" />
            </node>
          </node>
          <node concept="10Nm6u" id="6aiAwNFNnv0" role="3uHU7w" />
        </node>
      </node>
      <node concept="3clFbH" id="78MyQSnbO7R" role="3cqZAp" />
      <node concept="3cpWs8" id="78MyQSnbOQZ" role="3cqZAp">
        <node concept="3cpWsn" id="78MyQSnbOR0" role="3cpWs9">
          <property role="TrG5h" value="cycle" />
          <node concept="2I9FWS" id="78MyQSnbOQB" role="1tU5fm">
            <ref role="2I9WkF" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
          </node>
          <node concept="2YIFZM" id="78MyQSnbOR1" role="33vP2m">
            <ref role="37wK5l" to="wqgz:78MyQSnaYwr" resolve="cycleWith" />
            <ref role="1Pybhc" to="wqgz:78MyQSnaTrs" resolve="AttributeReferencesUtils" />
            <node concept="1YBJjd" id="78MyQSnbOR2" role="37wK5m">
              <ref role="1YBMHb" node="6aiAwNFNlZN" resolve="thisAttribute" />
            </node>
          </node>
        </node>
      </node>
      <node concept="3clFbJ" id="78MyQSnbP_l" role="3cqZAp">
        <node concept="3clFbS" id="78MyQSnbP_n" role="3clFbx">
          <node concept="2MkqsV" id="78MyQSnbTmr" role="3cqZAp">
            <node concept="3cpWs3" id="78MyQSnbTCH" role="2MkJ7o">
              <node concept="Xl_RD" id="78MyQSnbTmF" role="3uHU7B">
                <property role="Xl_RC" value="This attribute is part of a cycle through attribute references in initial values: " />
              </node>
              <node concept="2OqwBi" id="78MyQSnc3ze" role="3uHU7w">
                <node concept="2OqwBi" id="78MyQSnc22I" role="2Oq$k0">
                  <node concept="37vLTw" id="78MyQSncn3Q" role="2Oq$k0">
                    <ref role="3cqZAo" node="78MyQSnbOR0" resolve="cycle" />
                  </node>
                  <node concept="3$u5V9" id="78MyQSnc2mK" role="2OqNvi">
                    <node concept="1bVj0M" id="78MyQSnc2mM" role="23t8la">
                      <node concept="3clFbS" id="78MyQSnc2mN" role="1bW5cS">
                        <node concept="3clFbF" id="78MyQSnc2u4" role="3cqZAp">
                          <node concept="2YIFZM" id="78MyQSnc2xm" role="3clFbG">
                            <ref role="37wK5l" to="wyt6:~String.format(java.lang.String,java.lang.Object...)" resolve="format" />
                            <ref role="1Pybhc" to="wyt6:~String" resolve="String" />
                            <node concept="Xl_RD" id="78MyQSnc2$_" role="37wK5m">
                              <property role="Xl_RC" value="'%s' -&gt;" />
                            </node>
                            <node concept="2OqwBi" id="78MyQSncnwm" role="37wK5m">
                              <node concept="37vLTw" id="78MyQSnc37c" role="2Oq$k0">
                                <ref role="3cqZAo" node="78MyQSnc2mO" resolve="attribute" />
                              </node>
                              <node concept="3TrcHB" id="78MyQSncnFz" role="2OqNvi">
                                <ref role="3TsBF5" to="tpck:h0TrG11" resolve="name" />
                              </node>
                            </node>
                          </node>
                        </node>
                      </node>
                      <node concept="Rh6nW" id="78MyQSnc2mO" role="1bW2Oz">
                        <property role="TrG5h" value="attribute" />
                        <node concept="2jxLKc" id="78MyQSnc2mP" role="1tU5fm" />
                      </node>
                    </node>
                  </node>
                </node>
                <node concept="3uJxvA" id="78MyQSnc3UD" role="2OqNvi" />
              </node>
            </node>
            <node concept="1YBJjd" id="78MyQSnc1qH" role="1urrMF">
              <ref role="1YBMHb" node="6aiAwNFNlZN" resolve="thisAttribute" />
            </node>
          </node>
        </node>
        <node concept="2OqwBi" id="78MyQSnbRBb" role="3clFbw">
          <node concept="37vLTw" id="78MyQSnbPXV" role="2Oq$k0">
            <ref role="3cqZAo" node="78MyQSnbOR0" resolve="cycle" />
          </node>
          <node concept="3GX2aA" id="78MyQSnbTlF" role="2OqNvi" />
        </node>
      </node>
      <node concept="3clFbH" id="78MyQSnbOit" role="3cqZAp" />
      <node concept="3cpWs8" id="78MyQSnax3c" role="3cqZAp">
        <node concept="3cpWsn" id="78MyQSnax3d" role="3cpWs9">
          <property role="TrG5h" value="thisCamelCasedName" />
          <node concept="17QB3L" id="78MyQSnax2f" role="1tU5fm" />
          <node concept="2YIFZM" id="78MyQSnax3e" role="33vP2m">
            <ref role="37wK5l" to="wqgz:6aiAwNFNAAn" resolve="camelCase" />
            <ref role="1Pybhc" to="wqgz:7QeWzul4tHf" resolve="TextUtils" />
            <node concept="2OqwBi" id="78MyQSnax3f" role="37wK5m">
              <node concept="1YBJjd" id="78MyQSnax3g" role="2Oq$k0">
                <ref role="1YBMHb" node="6aiAwNFNlZN" resolve="thisAttribute" />
              </node>
              <node concept="3TrcHB" id="78MyQSnax3h" role="2OqNvi">
                <ref role="3TsBF5" to="tpck:h0TrG11" resolve="name" />
              </node>
            </node>
          </node>
        </node>
      </node>
      <node concept="3cpWs8" id="78MyQSnaDKy" role="3cqZAp">
        <node concept="3cpWsn" id="78MyQSnaDKz" role="3cpWs9">
          <property role="TrG5h" value="similarlyNamed" />
          <node concept="A3Dl8" id="78MyQSnaDJi" role="1tU5fm">
            <node concept="3Tqbb2" id="78MyQSnaDJl" role="A3Ik2">
              <ref role="ehGHo" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
            </node>
          </node>
          <node concept="2OqwBi" id="78MyQSnaDK$" role="33vP2m">
            <node concept="2OqwBi" id="78MyQSnaDK_" role="2Oq$k0">
              <node concept="2OqwBi" id="78MyQSnaDKA" role="2Oq$k0">
                <node concept="1YBJjd" id="78MyQSnaDKB" role="2Oq$k0">
                  <ref role="1YBMHb" node="6aiAwNFNlZN" resolve="thisAttribute" />
                </node>
                <node concept="2Xjw5R" id="78MyQSnaDKC" role="2OqNvi">
                  <node concept="1xMEDy" id="78MyQSnaDKD" role="1xVPHs">
                    <node concept="chp4Y" id="78MyQSnaDKE" role="ri$Ld">
                      <ref role="cht4Q" to="epnx:2oYTVs3bUDZ" resolve="RecordType" />
                    </node>
                  </node>
                </node>
              </node>
              <node concept="3Tsc0h" id="78MyQSnaDKF" role="2OqNvi">
                <ref role="3TtcxE" to="epnx:2oYTVs3bY4_" resolve="attributes" />
              </node>
            </node>
            <node concept="3zZkjj" id="78MyQSnaDKG" role="2OqNvi">
              <node concept="1bVj0M" id="78MyQSnaDKH" role="23t8la">
                <node concept="3clFbS" id="78MyQSnaDKI" role="1bW5cS">
                  <node concept="3clFbF" id="78MyQSnaDKJ" role="3cqZAp">
                    <node concept="1Wc70l" id="78MyQSnaDKK" role="3clFbG">
                      <node concept="2OqwBi" id="78MyQSnaDKL" role="3uHU7w">
                        <node concept="2YIFZM" id="78MyQSnaDKM" role="2Oq$k0">
                          <ref role="37wK5l" to="wqgz:6aiAwNFNAAn" resolve="camelCase" />
                          <ref role="1Pybhc" to="wqgz:7QeWzul4tHf" resolve="TextUtils" />
                          <node concept="2OqwBi" id="78MyQSnaDKN" role="37wK5m">
                            <node concept="37vLTw" id="78MyQSnaDKO" role="2Oq$k0">
                              <ref role="3cqZAo" node="78MyQSnaDKV" resolve="attribute" />
                            </node>
                            <node concept="3TrcHB" id="78MyQSnaDKP" role="2OqNvi">
                              <ref role="3TsBF5" to="tpck:h0TrG11" resolve="name" />
                            </node>
                          </node>
                        </node>
                        <node concept="liA8E" id="78MyQSnaDKQ" role="2OqNvi">
                          <ref role="37wK5l" to="wyt6:~String.equals(java.lang.Object)" resolve="equals" />
                          <node concept="37vLTw" id="78MyQSnaDKR" role="37wK5m">
                            <ref role="3cqZAo" node="78MyQSnax3d" resolve="thisCamelCasedName" />
                          </node>
                        </node>
                      </node>
                      <node concept="3y3z36" id="78MyQSnaDKS" role="3uHU7B">
                        <node concept="37vLTw" id="78MyQSnaDKT" role="3uHU7B">
                          <ref role="3cqZAo" node="78MyQSnaDKV" resolve="attribute" />
                        </node>
                        <node concept="1YBJjd" id="78MyQSnaDKU" role="3uHU7w">
                          <ref role="1YBMHb" node="6aiAwNFNlZN" resolve="thisAttribute" />
                        </node>
                      </node>
                    </node>
                  </node>
                </node>
                <node concept="Rh6nW" id="78MyQSnaDKV" role="1bW2Oz">
                  <property role="TrG5h" value="attribute" />
                  <node concept="2jxLKc" id="78MyQSnaDKW" role="1tU5fm" />
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
      <node concept="3clFbJ" id="78MyQSnaEel" role="3cqZAp">
        <node concept="3clFbS" id="78MyQSnaEen" role="3clFbx">
          <node concept="2MkqsV" id="78MyQSnaECF" role="3cqZAp">
            <node concept="3cpWs3" id="78MyQSnaEUQ" role="2MkJ7o">
              <node concept="2OqwBi" id="78MyQSnaP7u" role="3uHU7w">
                <node concept="2OqwBi" id="78MyQSnaG7g" role="2Oq$k0">
                  <node concept="37vLTw" id="78MyQSnaFZO" role="2Oq$k0">
                    <ref role="3cqZAo" node="78MyQSnaDKz" resolve="similarlyNamed" />
                  </node>
                  <node concept="3$u5V9" id="78MyQSnaGdK" role="2OqNvi">
                    <node concept="1bVj0M" id="78MyQSnaGdM" role="23t8la">
                      <node concept="3clFbS" id="78MyQSnaGdN" role="1bW5cS">
                        <node concept="3clFbF" id="78MyQSnaGg8" role="3cqZAp">
                          <node concept="3cpWs3" id="78MyQSnaOQt" role="3clFbG">
                            <node concept="Xl_RD" id="78MyQSnaOQw" role="3uHU7w">
                              <property role="Xl_RC" value="'" />
                            </node>
                            <node concept="3cpWs3" id="78MyQSnaOkw" role="3uHU7B">
                              <node concept="Xl_RD" id="78MyQSnaOmP" role="3uHU7B">
                                <property role="Xl_RC" value="'" />
                              </node>
                              <node concept="2OqwBi" id="78MyQSnaGuy" role="3uHU7w">
                                <node concept="37vLTw" id="78MyQSnaGg7" role="2Oq$k0">
                                  <ref role="3cqZAo" node="78MyQSnaGdO" resolve="attribute" />
                                </node>
                                <node concept="3TrcHB" id="78MyQSnaGD7" role="2OqNvi">
                                  <ref role="3TsBF5" to="tpck:h0TrG11" resolve="name" />
                                </node>
                              </node>
                            </node>
                          </node>
                        </node>
                      </node>
                      <node concept="Rh6nW" id="78MyQSnaGdO" role="1bW2Oz">
                        <property role="TrG5h" value="attribute" />
                        <node concept="2jxLKc" id="78MyQSnaGdP" role="1tU5fm" />
                      </node>
                    </node>
                  </node>
                </node>
                <node concept="3uJxvA" id="78MyQSnaPAQ" role="2OqNvi">
                  <node concept="Xl_RD" id="78MyQSnaQ0c" role="3uJOhx">
                    <property role="Xl_RC" value=", " />
                  </node>
                </node>
              </node>
              <node concept="Xl_RD" id="78MyQSnaECV" role="3uHU7B">
                <property role="Xl_RC" value="This attribute's name is too similar to the following other attributes' names: " />
              </node>
            </node>
            <node concept="1YBJjd" id="78MyQSnaEV9" role="1urrMF">
              <ref role="1YBMHb" node="6aiAwNFNlZN" resolve="thisAttribute" />
            </node>
          </node>
        </node>
        <node concept="2OqwBi" id="78MyQSnaEy4" role="3clFbw">
          <node concept="37vLTw" id="78MyQSnaEkf" role="2Oq$k0">
            <ref role="3cqZAo" node="78MyQSnaDKz" resolve="similarlyNamed" />
          </node>
          <node concept="3GX2aA" id="78MyQSnaECv" role="2OqNvi" />
        </node>
      </node>
    </node>
    <node concept="1YaCAy" id="6aiAwNFNlZN" role="1YuTPh">
      <property role="TrG5h" value="thisAttribute" />
      <ref role="1YaFvo" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
    </node>
  </node>
</model>

