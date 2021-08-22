<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:8b97a555-3587-49df-8d4b-762048e09ba9(BusinessDsl.behavior)">
  <persistence version="9" />
  <languages>
    <use id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel" version="18" />
    <use id="af65afd8-f0dd-4942-87d9-63a55f2a9db1" name="jetbrains.mps.lang.behavior" version="2" />
    <use id="d8f591ec-4d86-4af2-9f92-a9e93c803ffa" name="jetbrains.mps.lang.scopes" version="0" />
    <devkit ref="fbc25dd2-5da4-483a-8b19-70928e1b62d7(jetbrains.mps.devkit.general-purpose)" />
  </languages>
  <imports>
    <import index="tpcu" ref="r:00000000-0000-4000-0000-011c89590282(jetbrains.mps.lang.core.behavior)" />
    <import index="tpck" ref="r:00000000-0000-4000-0000-011c89590288(jetbrains.mps.lang.core.structure)" />
    <import index="o8zo" ref="r:314576fc-3aee-4386-a0a5-a38348ac317d(jetbrains.mps.scope)" />
    <import index="epnx" ref="r:f19c86b6-a649-477a-978e-ed78d81f87d9(BusinessDsl.structure)" />
    <import index="ni5j" ref="6354ebe7-c22a-4a0f-ac54-50b52ab9b065/java:java.util.regex(JDK/)" />
    <import index="wyt6" ref="6354ebe7-c22a-4a0f-ac54-50b52ab9b065/java:java.lang(JDK/)" implicit="true" />
    <import index="33ny" ref="6354ebe7-c22a-4a0f-ac54-50b52ab9b065/java:java.util(JDK/)" implicit="true" />
  </imports>
  <registry>
    <language id="af65afd8-f0dd-4942-87d9-63a55f2a9db1" name="jetbrains.mps.lang.behavior">
      <concept id="1225194240794" name="jetbrains.mps.lang.behavior.structure.ConceptBehavior" flags="ng" index="13h7C7">
        <reference id="1225194240799" name="concept" index="13h7C2" />
        <child id="1225194240805" name="method" index="13h7CS" />
        <child id="1225194240801" name="constructor" index="13h7CW" />
      </concept>
      <concept id="1225194413805" name="jetbrains.mps.lang.behavior.structure.ConceptConstructorDeclaration" flags="in" index="13hLZK" />
      <concept id="1225194472830" name="jetbrains.mps.lang.behavior.structure.ConceptMethodDeclaration" flags="ng" index="13i0hz">
        <reference id="1225194472831" name="overriddenMethod" index="13i0hy" />
      </concept>
      <concept id="1225194691553" name="jetbrains.mps.lang.behavior.structure.ThisNodeExpression" flags="nn" index="13iPFW" />
    </language>
    <language id="f3061a53-9226-4cc5-a443-f952ceaf5816" name="jetbrains.mps.baseLanguage">
      <concept id="1215693861676" name="jetbrains.mps.baseLanguage.structure.BaseAssignmentExpression" flags="nn" index="d038R">
        <child id="1068498886297" name="rValue" index="37vLTx" />
        <child id="1068498886295" name="lValue" index="37vLTJ" />
      </concept>
      <concept id="4836112446988635817" name="jetbrains.mps.baseLanguage.structure.UndefinedType" flags="in" index="2jxLKc" />
      <concept id="1202948039474" name="jetbrains.mps.baseLanguage.structure.InstanceMethodCallOperation" flags="nn" index="liA8E" />
      <concept id="1465982738277781862" name="jetbrains.mps.baseLanguage.structure.PlaceholderMember" flags="nn" index="2tJIrI" />
      <concept id="1076505808687" name="jetbrains.mps.baseLanguage.structure.WhileStatement" flags="nn" index="2$JKZl">
        <child id="1076505808688" name="condition" index="2$JKZa" />
      </concept>
      <concept id="1154032098014" name="jetbrains.mps.baseLanguage.structure.AbstractLoopStatement" flags="nn" index="2LF5Ji">
        <child id="1154032183016" name="body" index="2LFqv$" />
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
      <concept id="1070462154015" name="jetbrains.mps.baseLanguage.structure.StaticFieldDeclaration" flags="ig" index="Wx3nA" />
      <concept id="1070475926800" name="jetbrains.mps.baseLanguage.structure.StringLiteral" flags="nn" index="Xl_RD">
        <property id="1070475926801" name="value" index="Xl_RC" />
      </concept>
      <concept id="1081236700938" name="jetbrains.mps.baseLanguage.structure.StaticMethodDeclaration" flags="ig" index="2YIFZL" />
      <concept id="1081236700937" name="jetbrains.mps.baseLanguage.structure.StaticMethodCall" flags="nn" index="2YIFZM">
        <reference id="1144433194310" name="classConcept" index="1Pybhc" />
      </concept>
      <concept id="1070534058343" name="jetbrains.mps.baseLanguage.structure.NullLiteral" flags="nn" index="10Nm6u" />
      <concept id="1068390468198" name="jetbrains.mps.baseLanguage.structure.ClassConcept" flags="ig" index="312cEu" />
      <concept id="1068431474542" name="jetbrains.mps.baseLanguage.structure.VariableDeclaration" flags="ng" index="33uBYm">
        <child id="1068431790190" name="initializer" index="33vP2m" />
      </concept>
      <concept id="1068498886296" name="jetbrains.mps.baseLanguage.structure.VariableReference" flags="nn" index="37vLTw">
        <reference id="1068581517664" name="variableDeclaration" index="3cqZAo" />
      </concept>
      <concept id="1068498886292" name="jetbrains.mps.baseLanguage.structure.ParameterDeclaration" flags="ir" index="37vLTG" />
      <concept id="1068498886294" name="jetbrains.mps.baseLanguage.structure.AssignmentExpression" flags="nn" index="37vLTI" />
      <concept id="1225271177708" name="jetbrains.mps.baseLanguage.structure.StringType" flags="in" index="17QB3L" />
      <concept id="1225271283259" name="jetbrains.mps.baseLanguage.structure.NPEEqualsExpression" flags="nn" index="17R0WA" />
      <concept id="1225271408483" name="jetbrains.mps.baseLanguage.structure.IsNotEmptyOperation" flags="nn" index="17RvpY" />
      <concept id="4972933694980447171" name="jetbrains.mps.baseLanguage.structure.BaseVariableDeclaration" flags="ng" index="19Szcq">
        <child id="5680397130376446158" name="type" index="1tU5fm" />
      </concept>
      <concept id="1068580123132" name="jetbrains.mps.baseLanguage.structure.BaseMethodDeclaration" flags="ng" index="3clF44">
        <child id="1068580123133" name="returnType" index="3clF45" />
        <child id="1068580123134" name="parameter" index="3clF46" />
        <child id="1068580123135" name="body" index="3clF47" />
      </concept>
      <concept id="1068580123152" name="jetbrains.mps.baseLanguage.structure.EqualsExpression" flags="nn" index="3clFbC" />
      <concept id="1068580123155" name="jetbrains.mps.baseLanguage.structure.ExpressionStatement" flags="nn" index="3clFbF">
        <child id="1068580123156" name="expression" index="3clFbG" />
      </concept>
      <concept id="1068580123159" name="jetbrains.mps.baseLanguage.structure.IfStatement" flags="nn" index="3clFbJ">
        <child id="1068580123160" name="condition" index="3clFbw" />
        <child id="1068580123161" name="ifTrue" index="3clFbx" />
      </concept>
      <concept id="1068580123136" name="jetbrains.mps.baseLanguage.structure.StatementList" flags="sn" stub="5293379017992965193" index="3clFbS">
        <child id="1068581517665" name="statement" index="3cqZAp" />
      </concept>
      <concept id="1068580320020" name="jetbrains.mps.baseLanguage.structure.IntegerConstant" flags="nn" index="3cmrfG">
        <property id="1068580320021" name="value" index="3cmrfH" />
      </concept>
      <concept id="1068581242875" name="jetbrains.mps.baseLanguage.structure.PlusExpression" flags="nn" index="3cpWs3" />
      <concept id="1068581242878" name="jetbrains.mps.baseLanguage.structure.ReturnStatement" flags="nn" index="3cpWs6">
        <child id="1068581517676" name="expression" index="3cqZAk" />
      </concept>
      <concept id="1068581242864" name="jetbrains.mps.baseLanguage.structure.LocalVariableDeclarationStatement" flags="nn" index="3cpWs8">
        <child id="1068581242865" name="localVariableDeclaration" index="3cpWs9" />
      </concept>
      <concept id="1068581242863" name="jetbrains.mps.baseLanguage.structure.LocalVariableDeclaration" flags="nr" index="3cpWsn" />
      <concept id="1079359253375" name="jetbrains.mps.baseLanguage.structure.ParenthesizedExpression" flags="nn" index="1eOMI4">
        <child id="1079359253376" name="expression" index="1eOMHV" />
      </concept>
      <concept id="1081506762703" name="jetbrains.mps.baseLanguage.structure.GreaterThanExpression" flags="nn" index="3eOSWO" />
      <concept id="1081516740877" name="jetbrains.mps.baseLanguage.structure.NotExpression" flags="nn" index="3fqX7Q">
        <child id="1081516765348" name="expression" index="3fr31v" />
      </concept>
      <concept id="1204053956946" name="jetbrains.mps.baseLanguage.structure.IMethodCall" flags="ng" index="1ndlxa">
        <reference id="1068499141037" name="baseMethodDeclaration" index="37wK5l" />
        <child id="1068499141038" name="actualArgument" index="37wK5m" />
      </concept>
      <concept id="1107461130800" name="jetbrains.mps.baseLanguage.structure.Classifier" flags="ng" index="3pOWGL">
        <child id="5375687026011219971" name="member" index="jymVt" unordered="true" />
      </concept>
      <concept id="7812454656619025412" name="jetbrains.mps.baseLanguage.structure.LocalMethodCall" flags="nn" index="1rXfSq" />
      <concept id="1107535904670" name="jetbrains.mps.baseLanguage.structure.ClassifierType" flags="in" index="3uibUv">
        <reference id="1107535924139" name="classifier" index="3uigEE" />
      </concept>
      <concept id="1081773326031" name="jetbrains.mps.baseLanguage.structure.BinaryOperation" flags="nn" index="3uHJSO">
        <child id="1081773367579" name="rightExpression" index="3uHU7w" />
        <child id="1081773367580" name="leftExpression" index="3uHU7B" />
      </concept>
      <concept id="1073239437375" name="jetbrains.mps.baseLanguage.structure.NotEqualsExpression" flags="nn" index="3y3z36" />
      <concept id="1178549954367" name="jetbrains.mps.baseLanguage.structure.IVisible" flags="ng" index="1B3ioH">
        <child id="1178549979242" name="visibility" index="1B3o_S" />
      </concept>
      <concept id="1163668896201" name="jetbrains.mps.baseLanguage.structure.TernaryOperatorExpression" flags="nn" index="3K4zz7">
        <child id="1163668914799" name="condition" index="3K4Cdx" />
        <child id="1163668922816" name="ifTrue" index="3K4E3e" />
        <child id="1163668934364" name="ifFalse" index="3K4GZi" />
      </concept>
      <concept id="5497648299878491908" name="jetbrains.mps.baseLanguage.structure.BaseVariableReference" flags="nn" index="1M0zk4">
        <reference id="5497648299878491909" name="baseVariableDeclaration" index="1M0zk5" />
      </concept>
      <concept id="6329021646629104954" name="jetbrains.mps.baseLanguage.structure.SingleLineComment" flags="nn" index="3SKdUt">
        <child id="8356039341262087992" name="line" index="1aUNEU" />
      </concept>
      <concept id="1146644602865" name="jetbrains.mps.baseLanguage.structure.PublicVisibility" flags="nn" index="3Tm1VV" />
      <concept id="1146644623116" name="jetbrains.mps.baseLanguage.structure.PrivateVisibility" flags="nn" index="3Tm6S6" />
      <concept id="1080120340718" name="jetbrains.mps.baseLanguage.structure.AndExpression" flags="nn" index="1Wc70l" />
    </language>
    <language id="fd392034-7849-419d-9071-12563d152375" name="jetbrains.mps.baseLanguage.closures">
      <concept id="1199569711397" name="jetbrains.mps.baseLanguage.closures.structure.ClosureLiteral" flags="nn" index="1bVj0M">
        <child id="1199569906740" name="parameter" index="1bW2Oz" />
        <child id="1199569916463" name="body" index="1bW5cS" />
      </concept>
    </language>
    <language id="d8f591ec-4d86-4af2-9f92-a9e93c803ffa" name="jetbrains.mps.lang.scopes">
      <concept id="8077936094962911282" name="jetbrains.mps.lang.scopes.structure.ParentScope" flags="nn" index="iy90A" />
    </language>
    <language id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel">
      <concept id="1177026924588" name="jetbrains.mps.lang.smodel.structure.RefConcept_Reference" flags="nn" index="chp4Y">
        <reference id="1177026940964" name="conceptDeclaration" index="cht4Q" />
      </concept>
      <concept id="1138411891628" name="jetbrains.mps.lang.smodel.structure.SNodeOperation" flags="nn" index="eCIE_">
        <child id="1144104376918" name="parameter" index="1xVPHs" />
      </concept>
      <concept id="1179409122411" name="jetbrains.mps.lang.smodel.structure.Node_ConceptMethodCall" flags="nn" index="2qgKlT" />
      <concept id="1145383075378" name="jetbrains.mps.lang.smodel.structure.SNodeListType" flags="in" index="2I9FWS">
        <reference id="1145383142433" name="elementConcept" index="2I9WkF" />
      </concept>
      <concept id="1883223317721008708" name="jetbrains.mps.lang.smodel.structure.IfInstanceOfStatement" flags="nn" index="Jncv_">
        <reference id="1883223317721008712" name="nodeConcept" index="JncvD" />
        <child id="1883223317721008709" name="body" index="Jncv$" />
        <child id="1883223317721008711" name="variable" index="JncvA" />
        <child id="1883223317721008710" name="nodeExpression" index="JncvB" />
      </concept>
      <concept id="1883223317721008713" name="jetbrains.mps.lang.smodel.structure.IfInstanceOfVariable" flags="ng" index="JncvC" />
      <concept id="1883223317721107059" name="jetbrains.mps.lang.smodel.structure.IfInstanceOfVarReference" flags="nn" index="Jnkvi" />
      <concept id="1145567426890" name="jetbrains.mps.lang.smodel.structure.SNodeListCreator" flags="nn" index="2T8Vx0">
        <child id="1145567471833" name="createdType" index="2T96Bj" />
      </concept>
      <concept id="1171407110247" name="jetbrains.mps.lang.smodel.structure.Node_GetAncestorOperation" flags="nn" index="2Xjw5R" />
      <concept id="6677504323281689838" name="jetbrains.mps.lang.smodel.structure.SConceptType" flags="in" index="3bZ5Sz" />
      <concept id="1154546950173" name="jetbrains.mps.lang.smodel.structure.ConceptReference" flags="ng" index="3gn64h">
        <reference id="1154546997487" name="concept" index="3gnhBz" />
      </concept>
      <concept id="6039268229364358244" name="jetbrains.mps.lang.smodel.structure.ExactConceptCase" flags="ng" index="1pnPoh">
        <child id="6039268229364358388" name="body" index="1pnPq1" />
        <child id="6039268229364358387" name="concept" index="1pnPq6" />
      </concept>
      <concept id="1144101972840" name="jetbrains.mps.lang.smodel.structure.OperationParm_Concept" flags="ng" index="1xMEDy">
        <child id="1207343664468" name="conceptArgument" index="ri$Ld" />
      </concept>
      <concept id="5944356402132808749" name="jetbrains.mps.lang.smodel.structure.ConceptSwitchStatement" flags="nn" index="1_3QMa">
        <child id="6039268229365417680" name="defaultBlock" index="1prKM_" />
        <child id="5944356402132808753" name="case" index="1_3QMm" />
        <child id="5944356402132808752" name="expression" index="1_3QMn" />
      </concept>
      <concept id="1138055754698" name="jetbrains.mps.lang.smodel.structure.SNodeType" flags="in" index="3Tqbb2">
        <reference id="1138405853777" name="concept" index="ehGHo" />
      </concept>
      <concept id="1138056143562" name="jetbrains.mps.lang.smodel.structure.SLinkAccess" flags="nn" index="3TrEf2">
        <reference id="1138056516764" name="link" index="3Tt5mk" />
      </concept>
      <concept id="1138056282393" name="jetbrains.mps.lang.smodel.structure.SLinkListAccess" flags="nn" index="3Tsc0h">
        <reference id="1138056546658" name="link" index="3TtcxE" />
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
    <language id="c7fb639f-be78-4307-89b0-b5959c3fa8c8" name="jetbrains.mps.lang.text">
      <concept id="155656958578482948" name="jetbrains.mps.lang.text.structure.Word" flags="nn" index="3oM_SD">
        <property id="155656958578482949" name="value" index="3oM_SC" />
      </concept>
      <concept id="2535923850359271782" name="jetbrains.mps.lang.text.structure.Line" flags="nn" index="1PaTwC">
        <child id="2535923850359271783" name="elements" index="1PaTwD" />
      </concept>
    </language>
    <language id="83888646-71ce-4f1c-9c53-c54016f6ad4f" name="jetbrains.mps.baseLanguage.collections">
      <concept id="540871147943773365" name="jetbrains.mps.baseLanguage.collections.structure.SingleArgumentSequenceOperation" flags="nn" index="25WWJ4">
        <child id="540871147943773366" name="argument" index="25WWJ7" />
      </concept>
      <concept id="1151688443754" name="jetbrains.mps.baseLanguage.collections.structure.ListType" flags="in" index="_YKpA">
        <child id="1151688676805" name="elementType" index="_ZDj9" />
      </concept>
      <concept id="1237721394592" name="jetbrains.mps.baseLanguage.collections.structure.AbstractContainerCreator" flags="nn" index="HWqM0">
        <child id="1237721435807" name="elementType" index="HW$YZ" />
      </concept>
      <concept id="1160600644654" name="jetbrains.mps.baseLanguage.collections.structure.ListCreatorWithInit" flags="nn" index="Tc6Ow" />
      <concept id="1160612413312" name="jetbrains.mps.baseLanguage.collections.structure.AddElementOperation" flags="nn" index="TSZUe" />
      <concept id="1162934736510" name="jetbrains.mps.baseLanguage.collections.structure.GetElementOperation" flags="nn" index="34jXtK" />
    </language>
  </registry>
  <node concept="312cEu" id="7QeWzul4tHf">
    <property role="TrG5h" value="TextUtils" />
    <node concept="2tJIrI" id="7QeWzul4x_U" role="jymVt" />
    <node concept="2YIFZL" id="7QeWzul4tIt" role="jymVt">
      <property role="TrG5h" value="indefiniteArticle" />
      <node concept="3clFbS" id="7QeWzul4tI3" role="3clF47">
        <node concept="3clFbF" id="7QeWzul4vNm" role="3cqZAp">
          <node concept="3cpWs3" id="7QeWzul4w9E" role="3clFbG">
            <node concept="1eOMI4" id="7QeWzul4xiH" role="3uHU7w">
              <node concept="3K4zz7" id="7QeWzul4xke" role="1eOMHV">
                <node concept="Xl_RD" id="7QeWzul4xm0" role="3K4E3e">
                  <property role="Xl_RC" value="n" />
                </node>
                <node concept="Xl_RD" id="7QeWzul4xnA" role="3K4GZi">
                  <property role="Xl_RC" value="" />
                </node>
                <node concept="1eOMI4" id="2oYTVs3dUWN" role="3K4Cdx">
                  <node concept="1Wc70l" id="2oYTVs3dV2M" role="1eOMHV">
                    <node concept="2OqwBi" id="2oYTVs3dVvS" role="3uHU7B">
                      <node concept="37vLTw" id="2oYTVs3dV4A" role="2Oq$k0">
                        <ref role="3cqZAo" node="7QeWzul4vLg" resolve="nextWord" />
                      </node>
                      <node concept="17RvpY" id="2oYTVs3dVJT" role="2OqNvi" />
                    </node>
                    <node concept="3eOSWO" id="2oYTVs3eti5" role="3uHU7w">
                      <node concept="3cmrfG" id="2oYTVs3etiz" role="3uHU7w">
                        <property role="3cmrfH" value="-1" />
                      </node>
                      <node concept="2OqwBi" id="2oYTVs3eqOt" role="3uHU7B">
                        <node concept="Xl_RD" id="2oYTVs3eqtW" role="2Oq$k0">
                          <property role="Xl_RC" value="aeiou" />
                        </node>
                        <node concept="liA8E" id="2oYTVs3eqRn" role="2OqNvi">
                          <ref role="37wK5l" to="wyt6:~String.indexOf(int)" resolve="indexOf" />
                          <node concept="2OqwBi" id="2oYTVs3erCo" role="37wK5m">
                            <node concept="2OqwBi" id="3yMAGXdICHa" role="2Oq$k0">
                              <node concept="37vLTw" id="2oYTVs3er23" role="2Oq$k0">
                                <ref role="3cqZAo" node="7QeWzul4vLg" resolve="nextWord" />
                              </node>
                              <node concept="liA8E" id="3yMAGXdICY0" role="2OqNvi">
                                <ref role="37wK5l" to="wyt6:~String.toLowerCase()" resolve="toLowerCase" />
                              </node>
                            </node>
                            <node concept="liA8E" id="2oYTVs3es60" role="2OqNvi">
                              <ref role="37wK5l" to="wyt6:~String.charAt(int)" resolve="charAt" />
                              <node concept="3cmrfG" id="2oYTVs3esyL" role="37wK5m">
                                <property role="3cmrfH" value="0" />
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
            <node concept="Xl_RD" id="7QeWzul4vNl" role="3uHU7B">
              <property role="Xl_RC" value="a" />
            </node>
          </node>
        </node>
      </node>
      <node concept="17QB3L" id="7QeWzul4x$6" role="3clF45" />
      <node concept="3Tm1VV" id="7QeWzul4tI2" role="1B3o_S" />
      <node concept="37vLTG" id="7QeWzul4vLg" role="3clF46">
        <property role="TrG5h" value="nextWord" />
        <node concept="17QB3L" id="7QeWzul4vLf" role="1tU5fm" />
      </node>
    </node>
    <node concept="2tJIrI" id="6aiAwNFNLsP" role="jymVt" />
    <node concept="2YIFZL" id="6aiAwNFNAAn" role="jymVt">
      <property role="TrG5h" value="camelCase" />
      <node concept="17QB3L" id="6aiAwNFNACQ" role="3clF45" />
      <node concept="3Tm1VV" id="6aiAwNFNAAq" role="1B3o_S" />
      <node concept="3clFbS" id="6aiAwNFNAAr" role="3clF47">
        <node concept="3clFbJ" id="5RUYK73$WVl" role="3cqZAp">
          <node concept="3clFbS" id="5RUYK73$WVn" role="3clFbx">
            <node concept="3cpWs6" id="5RUYK73$XFR" role="3cqZAp">
              <node concept="Xl_RD" id="5RUYK73$XGr" role="3cqZAk">
                <property role="Xl_RC" value="__generationProblemDueToNonStringArgumentToCamelCase" />
              </node>
            </node>
          </node>
          <node concept="17R0WA" id="5RUYK73$XAt" role="3clFbw">
            <node concept="10Nm6u" id="5RUYK73$XFf" role="3uHU7w" />
            <node concept="37vLTw" id="5RUYK73$XbZ" role="3uHU7B">
              <ref role="3cqZAo" node="6aiAwNFNAHd" resolve="originalStr" />
            </node>
          </node>
        </node>
        <node concept="3cpWs8" id="6aiAwNFNG8R" role="3cqZAp">
          <node concept="3cpWsn" id="6aiAwNFNG8S" role="3cpWs9">
            <property role="TrG5h" value="str" />
            <node concept="17QB3L" id="6aiAwNFNG4g" role="1tU5fm" />
            <node concept="2OqwBi" id="6aiAwNFNGxv" role="33vP2m">
              <node concept="37vLTw" id="6aiAwNFNG8T" role="2Oq$k0">
                <ref role="3cqZAo" node="6aiAwNFNAHd" resolve="originalStr" />
              </node>
              <node concept="liA8E" id="6aiAwNFNGLe" role="2OqNvi">
                <ref role="37wK5l" to="wyt6:~String.toLowerCase()" resolve="toLowerCase" />
              </node>
            </node>
          </node>
        </node>
        <node concept="3cpWs8" id="6aiAwNFNJZO" role="3cqZAp">
          <node concept="3cpWsn" id="6aiAwNFNJZP" role="3cpWs9">
            <property role="TrG5h" value="matcher" />
            <node concept="3uibUv" id="6aiAwNFNJWi" role="1tU5fm">
              <ref role="3uigEE" to="ni5j:~Matcher" resolve="Matcher" />
            </node>
            <node concept="2OqwBi" id="6aiAwNFNJZQ" role="33vP2m">
              <node concept="2YIFZM" id="6aiAwNFNJZR" role="2Oq$k0">
                <ref role="37wK5l" to="ni5j:~Pattern.compile(java.lang.String)" resolve="compile" />
                <ref role="1Pybhc" to="ni5j:~Pattern" resolve="Pattern" />
                <node concept="Xl_RD" id="6aiAwNFNJZS" role="37wK5m">
                  <property role="Xl_RC" value="\\s+([a-z])" />
                </node>
              </node>
              <node concept="liA8E" id="6aiAwNFNJZT" role="2OqNvi">
                <ref role="37wK5l" to="ni5j:~Pattern.matcher(java.lang.CharSequence)" resolve="matcher" />
                <node concept="37vLTw" id="6aiAwNFNJZU" role="37wK5m">
                  <ref role="3cqZAo" node="6aiAwNFNG8S" resolve="str" />
                </node>
              </node>
            </node>
          </node>
        </node>
        <node concept="3SKdUt" id="6aiAwNFNUJB" role="3cqZAp">
          <node concept="1PaTwC" id="6aiAwNFNUJC" role="1aUNEU">
            <node concept="3oM_SD" id="6aiAwNFNUJD" role="1PaTwD">
              <property role="3oM_SC" value="TODO" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFNUVD" role="1PaTwD">
              <property role="3oM_SC" value="" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFNUVG" role="1PaTwD">
              <property role="3oM_SC" value="use" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFNUVS" role="1PaTwD">
              <property role="3oM_SC" value="closure" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFNUWt" role="1PaTwD">
              <property role="3oM_SC" value="argument" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFNUWz" role="1PaTwD">
              <property role="3oM_SC" value="with" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFNUWM" role="1PaTwD">
              <property role="3oM_SC" value="inferred" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFNUX2" role="1PaTwD">
              <property role="3oM_SC" value="type?" />
            </node>
          </node>
        </node>
        <node concept="3clFbF" id="78MyQSnanHY" role="3cqZAp">
          <node concept="37vLTI" id="78MyQSnaog0" role="3clFbG">
            <node concept="2OqwBi" id="78MyQSnaowL" role="37vLTx">
              <node concept="37vLTw" id="78MyQSnaolP" role="2Oq$k0">
                <ref role="3cqZAo" node="6aiAwNFNJZP" resolve="matcher" />
              </node>
              <node concept="liA8E" id="78MyQSnaoE$" role="2OqNvi">
                <ref role="37wK5l" to="ni5j:~Matcher.replaceAll(java.util.function.Function)" resolve="replaceAll" />
                <node concept="1bVj0M" id="78MyQSnaoGG" role="37wK5m">
                  <node concept="3clFbS" id="78MyQSnaoGH" role="1bW5cS">
                    <node concept="3clFbF" id="78MyQSnaoGI" role="3cqZAp">
                      <node concept="2OqwBi" id="78MyQSnaoGJ" role="3clFbG">
                        <node concept="2OqwBi" id="78MyQSnaoGK" role="2Oq$k0">
                          <node concept="37vLTw" id="78MyQSnaoGL" role="2Oq$k0">
                            <ref role="3cqZAo" node="78MyQSnaoGO" resolve="matchResult" />
                          </node>
                          <node concept="liA8E" id="78MyQSnaoGM" role="2OqNvi">
                            <ref role="37wK5l" to="ni5j:~MatchResult.group()" resolve="group" />
                          </node>
                        </node>
                        <node concept="liA8E" id="78MyQSnaoGN" role="2OqNvi">
                          <ref role="37wK5l" to="wyt6:~String.toUpperCase()" resolve="toUpperCase" />
                        </node>
                      </node>
                    </node>
                  </node>
                  <node concept="37vLTG" id="78MyQSnaoGO" role="1bW2Oz">
                    <property role="TrG5h" value="matchResult" />
                    <node concept="3uibUv" id="78MyQSnaoGP" role="1tU5fm">
                      <ref role="3uigEE" to="ni5j:~MatchResult" resolve="MatchResult" />
                    </node>
                  </node>
                </node>
              </node>
            </node>
            <node concept="37vLTw" id="78MyQSnanHW" role="37vLTJ">
              <ref role="3cqZAo" node="6aiAwNFNG8S" resolve="str" />
            </node>
          </node>
        </node>
        <node concept="3clFbF" id="78MyQSnaoXB" role="3cqZAp">
          <node concept="37vLTI" id="78MyQSnapfL" role="3clFbG">
            <node concept="2OqwBi" id="78MyQSnapJL" role="37vLTx">
              <node concept="37vLTw" id="78MyQSnapxU" role="2Oq$k0">
                <ref role="3cqZAo" node="6aiAwNFNG8S" resolve="str" />
              </node>
              <node concept="liA8E" id="78MyQSnapZO" role="2OqNvi">
                <ref role="37wK5l" to="wyt6:~String.replaceAll(java.lang.String,java.lang.String)" resolve="replaceAll" />
                <node concept="Xl_RD" id="78MyQSnaq21" role="37wK5m">
                  <property role="Xl_RC" value=" " />
                </node>
                <node concept="Xl_RD" id="78MyQSnaq4X" role="37wK5m">
                  <property role="Xl_RC" value="" />
                </node>
              </node>
            </node>
            <node concept="37vLTw" id="78MyQSnaoX_" role="37vLTJ">
              <ref role="3cqZAo" node="6aiAwNFNG8S" resolve="str" />
            </node>
          </node>
        </node>
        <node concept="3cpWs6" id="78MyQSnaqki" role="3cqZAp">
          <node concept="37vLTw" id="78MyQSnaqxa" role="3cqZAk">
            <ref role="3cqZAo" node="6aiAwNFNG8S" resolve="str" />
          </node>
        </node>
      </node>
      <node concept="37vLTG" id="6aiAwNFNAHd" role="3clF46">
        <property role="TrG5h" value="originalStr" />
        <node concept="17QB3L" id="6aiAwNFNAHc" role="1tU5fm" />
      </node>
    </node>
    <node concept="2tJIrI" id="7QeWzul4x_n" role="jymVt" />
    <node concept="3Tm1VV" id="7QeWzul4tHg" role="1B3o_S" />
  </node>
  <node concept="13h7C7" id="2oYTVs3dR1s">
    <property role="3GE5qa" value="types" />
    <ref role="13h7C2" to="epnx:2oYTVs3bUDZ" resolve="RecordType" />
    <node concept="13hLZK" id="2oYTVs3dR1t" role="13h7CW">
      <node concept="3clFbS" id="2oYTVs3dR1u" role="2VODD2">
        <node concept="3SKdUt" id="6aiAwNFLZfn" role="3cqZAp">
          <node concept="1PaTwC" id="6aiAwNFLZfo" role="1aUNEU">
            <node concept="3oM_SD" id="6aiAwNFLZfp" role="1PaTwD">
              <property role="3oM_SC" value="FIXME" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZtC" role="1PaTwD">
              <property role="3oM_SC" value="" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZtS" role="1PaTwD">
              <property role="3oM_SC" value="for" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZfA" role="1PaTwD">
              <property role="3oM_SC" value="some" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZfD" role="1PaTwD">
              <property role="3oM_SC" value="reason," />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZfX" role="1PaTwD">
              <property role="3oM_SC" value="this" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZg2" role="1PaTwD">
              <property role="3oM_SC" value="behavior" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZgw" role="1PaTwD">
              <property role="3oM_SC" value="needs" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZgB" role="1PaTwD">
              <property role="3oM_SC" value="to" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZgJ" role="1PaTwD">
              <property role="3oM_SC" value="exist," />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZh8" role="1PaTwD">
              <property role="3oM_SC" value="otherwise" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZih" role="1PaTwD">
              <property role="3oM_SC" value="the" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZis" role="1PaTwD">
              <property role="3oM_SC" value="generated" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZiK" role="1PaTwD">
              <property role="3oM_SC" value="Java" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZiX" role="1PaTwD">
              <property role="3oM_SC" value="doesn't" />
            </node>
            <node concept="3oM_SD" id="6aiAwNFLZjb" role="1PaTwD">
              <property role="3oM_SC" value="compile..." />
            </node>
          </node>
        </node>
      </node>
    </node>
  </node>
  <node concept="13h7C7" id="6aiAwNFLZH7">
    <property role="3GE5qa" value="expr" />
    <ref role="13h7C2" to="epnx:2oYTVs3bY4E" resolve="AttributeReference" />
    <node concept="13i0hz" id="6aiAwNFNqwN" role="13h7CS">
      <property role="TrG5h" value="referableAttributes" />
      <node concept="3Tm6S6" id="6aiAwNFNq_j" role="1B3o_S" />
      <node concept="3clFbS" id="6aiAwNFNqwQ" role="3clF47">
        <node concept="3clFbF" id="vMXKKlSRg_" role="3cqZAp">
          <node concept="2OqwBi" id="vMXKKlSS3D" role="3clFbG">
            <node concept="2OqwBi" id="vMXKKlSRsN" role="2Oq$k0">
              <node concept="13iPFW" id="vMXKKlSRgz" role="2Oq$k0" />
              <node concept="2Xjw5R" id="vMXKKlSRN0" role="2OqNvi">
                <node concept="1xMEDy" id="vMXKKlSRN2" role="1xVPHs">
                  <node concept="chp4Y" id="vMXKKlSRT1" role="ri$Ld">
                    <ref role="cht4Q" to="epnx:2oYTVs3bUDZ" resolve="RecordType" />
                  </node>
                </node>
              </node>
            </node>
            <node concept="3Tsc0h" id="vMXKKlSSfK" role="2OqNvi">
              <ref role="3TtcxE" to="epnx:2oYTVs3bY4_" resolve="attributes" />
            </node>
          </node>
        </node>
      </node>
      <node concept="2I9FWS" id="6aiAwNFNrNM" role="3clF45">
        <ref role="2I9WkF" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
      </node>
    </node>
    <node concept="13hLZK" id="6aiAwNFLZH8" role="13h7CW">
      <node concept="3clFbS" id="6aiAwNFLZH9" role="2VODD2" />
    </node>
    <node concept="13i0hz" id="6aiAwNFLZHx" role="13h7CS">
      <property role="TrG5h" value="getScope" />
      <ref role="13i0hy" to="tpcu:52_Geb4QDV$" resolve="getScope" />
      <node concept="3Tm1VV" id="6aiAwNFLZHy" role="1B3o_S" />
      <node concept="3clFbS" id="6aiAwNFLZHF" role="3clF47">
        <node concept="1_3QMa" id="6aiAwNFM02U" role="3cqZAp">
          <node concept="37vLTw" id="6aiAwNFM036" role="1_3QMn">
            <ref role="3cqZAo" node="6aiAwNFLZHG" resolve="kind" />
          </node>
          <node concept="1pnPoh" id="6aiAwNFM03j" role="1_3QMm">
            <node concept="3gn64h" id="6aiAwNFMOis" role="1pnPq6">
              <ref role="3gnhBz" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
            </node>
            <node concept="3clFbS" id="6aiAwNFM03l" role="1pnPq1">
              <node concept="3cpWs6" id="6aiAwNFNwDW" role="3cqZAp">
                <node concept="2YIFZM" id="6aiAwNFNwT8" role="3cqZAk">
                  <ref role="37wK5l" to="o8zo:4IP40Bi3eAf" resolve="forNamedElements" />
                  <ref role="1Pybhc" to="o8zo:4IP40Bi3e_R" resolve="ListScope" />
                  <node concept="2OqwBi" id="6aiAwNFNxff" role="37wK5m">
                    <node concept="13iPFW" id="6aiAwNFNx0V" role="2Oq$k0" />
                    <node concept="2qgKlT" id="6aiAwNFNxtt" role="2OqNvi">
                      <ref role="37wK5l" node="6aiAwNFNqwN" resolve="referableAttributes" />
                    </node>
                  </node>
                </node>
              </node>
            </node>
          </node>
          <node concept="3clFbS" id="6aiAwNFM10N" role="1prKM_">
            <node concept="3cpWs6" id="6aiAwNFM10M" role="3cqZAp">
              <node concept="iy90A" id="6aiAwNFM1cF" role="3cqZAk" />
            </node>
          </node>
        </node>
      </node>
      <node concept="37vLTG" id="6aiAwNFLZHG" role="3clF46">
        <property role="TrG5h" value="kind" />
        <node concept="3bZ5Sz" id="6aiAwNFLZHH" role="1tU5fm" />
      </node>
      <node concept="37vLTG" id="6aiAwNFLZHI" role="3clF46">
        <property role="TrG5h" value="child" />
        <node concept="3Tqbb2" id="6aiAwNFLZHJ" role="1tU5fm" />
      </node>
      <node concept="3uibUv" id="6aiAwNFLZHK" role="3clF45">
        <ref role="3uigEE" to="o8zo:3fifI_xCtN$" resolve="Scope" />
      </node>
    </node>
  </node>
  <node concept="312cEu" id="78MyQSnaTrs">
    <property role="TrG5h" value="AttributeReferencesUtils" />
    <node concept="2tJIrI" id="78MyQSnaY1h" role="jymVt" />
    <node concept="2YIFZL" id="78MyQSnb7sW" role="jymVt">
      <property role="TrG5h" value="referencedAttributeOrNull" />
      <node concept="3Tqbb2" id="78MyQSnb7$g" role="3clF45">
        <ref role="ehGHo" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
      </node>
      <node concept="3Tm1VV" id="78MyQSnb7sZ" role="1B3o_S" />
      <node concept="3clFbS" id="78MyQSnb7t0" role="3clF47">
        <node concept="Jncv_" id="78MyQSnb8sQ" role="3cqZAp">
          <ref role="JncvD" to="epnx:2oYTVs3bY4E" resolve="AttributeReference" />
          <node concept="2OqwBi" id="78MyQSnb8Bq" role="JncvB">
            <node concept="37vLTw" id="78MyQSnb8uD" role="2Oq$k0">
              <ref role="3cqZAo" node="78MyQSnb7Gh" resolve="attribute" />
            </node>
            <node concept="3TrEf2" id="78MyQSnb8KB" role="2OqNvi">
              <ref role="3Tt5mk" to="epnx:2oYTVs3bY4B" resolve="value" />
            </node>
          </node>
          <node concept="3clFbS" id="78MyQSnb8sU" role="Jncv$">
            <node concept="3cpWs6" id="78MyQSnb8Om" role="3cqZAp">
              <node concept="2OqwBi" id="78MyQSnb94z" role="3cqZAk">
                <node concept="Jnkvi" id="78MyQSnb8SH" role="2Oq$k0">
                  <ref role="1M0zk5" node="78MyQSnb8sW" resolve="attributeReference" />
                </node>
                <node concept="3TrEf2" id="78MyQSnb9hP" role="2OqNvi">
                  <ref role="3Tt5mk" to="epnx:2oYTVs3bY4F" resolve="attribute" />
                </node>
              </node>
            </node>
          </node>
          <node concept="JncvC" id="78MyQSnb8sW" role="JncvA">
            <property role="TrG5h" value="attributeReference" />
            <node concept="2jxLKc" id="78MyQSnb8sX" role="1tU5fm" />
          </node>
        </node>
        <node concept="3cpWs6" id="78MyQSnb9m6" role="3cqZAp">
          <node concept="10Nm6u" id="78MyQSnb9pw" role="3cqZAk" />
        </node>
      </node>
      <node concept="37vLTG" id="78MyQSnb7Gh" role="3clF46">
        <property role="TrG5h" value="attribute" />
        <node concept="3Tqbb2" id="78MyQSnb7Gg" role="1tU5fm">
          <ref role="ehGHo" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
        </node>
      </node>
    </node>
    <node concept="2tJIrI" id="78MyQSnb7Ba" role="jymVt" />
    <node concept="Wx3nA" id="78MyQSndwjU" role="jymVt">
      <property role="TrG5h" value="emptyAttributesList" />
      <node concept="3Tm6S6" id="78MyQSndwjW" role="1B3o_S" />
      <node concept="2I9FWS" id="78MyQSndwo1" role="1tU5fm">
        <ref role="2I9WkF" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
      </node>
      <node concept="2ShNRf" id="78MyQSndwtT" role="33vP2m">
        <node concept="2T8Vx0" id="78MyQSndxDK" role="2ShVmc">
          <node concept="2I9FWS" id="78MyQSndxDM" role="2T96Bj">
            <ref role="2I9WkF" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
          </node>
        </node>
      </node>
    </node>
    <node concept="2tJIrI" id="78MyQSndwfV" role="jymVt" />
    <node concept="2YIFZL" id="78MyQSnaYwr" role="jymVt">
      <property role="TrG5h" value="cycleWith" />
      <node concept="3Tm1VV" id="78MyQSnaYwu" role="1B3o_S" />
      <node concept="3clFbS" id="78MyQSnaYwv" role="3clF47">
        <node concept="3cpWs8" id="78MyQSnaYOf" role="3cqZAp">
          <node concept="3cpWsn" id="78MyQSnaYOg" role="3cpWs9">
            <property role="TrG5h" value="chain" />
            <node concept="_YKpA" id="78MyQSnaYO3" role="1tU5fm">
              <node concept="3Tqbb2" id="78MyQSnaYO6" role="_ZDj9">
                <ref role="ehGHo" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
              </node>
            </node>
            <node concept="2ShNRf" id="78MyQSnaYOh" role="33vP2m">
              <node concept="Tc6Ow" id="78MyQSnaYOi" role="2ShVmc">
                <node concept="3Tqbb2" id="78MyQSnaYOj" role="HW$YZ">
                  <ref role="ehGHo" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
                </node>
              </node>
            </node>
          </node>
        </node>
        <node concept="3cpWs8" id="78MyQSnaYUm" role="3cqZAp">
          <node concept="3cpWsn" id="78MyQSnaYUn" role="3cpWs9">
            <property role="TrG5h" value="current" />
            <node concept="3Tqbb2" id="78MyQSnaYTT" role="1tU5fm">
              <ref role="ehGHo" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
            </node>
            <node concept="37vLTw" id="78MyQSnaYUo" role="33vP2m">
              <ref role="3cqZAo" node="78MyQSnaY$t" resolve="attribute" />
            </node>
          </node>
        </node>
        <node concept="2$JKZl" id="78MyQSnaYYL" role="3cqZAp">
          <node concept="3clFbS" id="78MyQSnaYYN" role="2LFqv$">
            <node concept="3clFbF" id="78MyQSnb3cp" role="3cqZAp">
              <node concept="2OqwBi" id="78MyQSnb4$Q" role="3clFbG">
                <node concept="37vLTw" id="78MyQSnb3co" role="2Oq$k0">
                  <ref role="3cqZAo" node="78MyQSnaYOg" resolve="chain" />
                </node>
                <node concept="TSZUe" id="78MyQSnb6pm" role="2OqNvi">
                  <node concept="37vLTw" id="78MyQSnb6w7" role="25WWJ7">
                    <ref role="3cqZAo" node="78MyQSnaYUn" resolve="current" />
                  </node>
                </node>
              </node>
            </node>
            <node concept="3clFbF" id="78MyQSnb6z4" role="3cqZAp">
              <node concept="37vLTI" id="78MyQSnb6FP" role="3clFbG">
                <node concept="37vLTw" id="78MyQSnb6z2" role="37vLTJ">
                  <ref role="3cqZAo" node="78MyQSnaYUn" resolve="current" />
                </node>
                <node concept="1rXfSq" id="78MyQSnb9zx" role="37vLTx">
                  <ref role="37wK5l" node="78MyQSnb7sW" resolve="referencedAttributeOrNull" />
                  <node concept="37vLTw" id="78MyQSnb9BY" role="37wK5m">
                    <ref role="3cqZAo" node="78MyQSnaYUn" resolve="current" />
                  </node>
                </node>
              </node>
            </node>
          </node>
          <node concept="1Wc70l" id="78MyQSnaZiG" role="2$JKZa">
            <node concept="3fqX7Q" id="78MyQSnb31S" role="3uHU7w">
              <node concept="2OqwBi" id="78MyQSnb12A" role="3fr31v">
                <node concept="37vLTw" id="78MyQSnaZlR" role="2Oq$k0">
                  <ref role="3cqZAo" node="78MyQSnaYOg" resolve="chain" />
                </node>
                <node concept="liA8E" id="78MyQSnb2v7" role="2OqNvi">
                  <ref role="37wK5l" to="33ny:~List.contains(java.lang.Object)" resolve="contains" />
                  <node concept="37vLTw" id="78MyQSnb2BD" role="37wK5m">
                    <ref role="3cqZAo" node="78MyQSnaYUn" resolve="current" />
                  </node>
                </node>
              </node>
            </node>
            <node concept="3y3z36" id="78MyQSnaZb9" role="3uHU7B">
              <node concept="37vLTw" id="78MyQSnaZ0D" role="3uHU7B">
                <ref role="3cqZAo" node="78MyQSnaYUn" resolve="current" />
              </node>
              <node concept="10Nm6u" id="78MyQSnaZhE" role="3uHU7w" />
            </node>
          </node>
        </node>
        <node concept="3cpWs6" id="78MyQSnb9Q9" role="3cqZAp">
          <node concept="3K4zz7" id="78MyQSnbdN8" role="3cqZAk">
            <node concept="37vLTw" id="78MyQSnbe1V" role="3K4E3e">
              <ref role="3cqZAo" node="78MyQSnaYOg" resolve="chain" />
            </node>
            <node concept="37vLTw" id="78MyQSndy5F" role="3K4GZi">
              <ref role="3cqZAo" node="78MyQSndwjU" resolve="emptyAttributesList" />
            </node>
            <node concept="3clFbC" id="78MyQSnbdkX" role="3K4Cdx">
              <node concept="37vLTw" id="78MyQSnbd$X" role="3uHU7w">
                <ref role="3cqZAo" node="78MyQSnaYUn" resolve="current" />
              </node>
              <node concept="2OqwBi" id="78MyQSnbbwy" role="3uHU7B">
                <node concept="37vLTw" id="78MyQSnba0C" role="2Oq$k0">
                  <ref role="3cqZAo" node="78MyQSnaYOg" resolve="chain" />
                </node>
                <node concept="34jXtK" id="78MyQSnbcZf" role="2OqNvi">
                  <node concept="3cmrfG" id="78MyQSnbd7w" role="25WWJ7">
                    <property role="3cmrfH" value="0" />
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
      <node concept="2I9FWS" id="78MyQSnaYxX" role="3clF45">
        <ref role="2I9WkF" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
      </node>
      <node concept="37vLTG" id="78MyQSnaY$t" role="3clF46">
        <property role="TrG5h" value="attribute" />
        <node concept="3Tqbb2" id="78MyQSnaY$s" role="1tU5fm">
          <ref role="ehGHo" to="epnx:2oYTVs3bXnT" resolve="Attribute" />
        </node>
      </node>
    </node>
    <node concept="2tJIrI" id="78MyQSnaYzw" role="jymVt" />
    <node concept="3Tm1VV" id="78MyQSnaTrt" role="1B3o_S" />
  </node>
</model>

