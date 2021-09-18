<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:f19c86b6-a649-477a-978e-ed78d81f87d9(BusinessDsl.structure)">
  <persistence version="9" />
  <languages>
    <use id="c72da2b9-7cce-4447-8389-f407dc1158b7" name="jetbrains.mps.lang.structure" version="9" />
    <devkit ref="78434eb8-b0e5-444b-850d-e7c4ad2da9ab(jetbrains.mps.devkit.aspect.structure)" />
  </languages>
  <imports>
    <import index="tpck" ref="r:00000000-0000-4000-0000-011c89590288(jetbrains.mps.lang.core.structure)" implicit="true" />
  </imports>
  <registry>
    <language id="c72da2b9-7cce-4447-8389-f407dc1158b7" name="jetbrains.mps.lang.structure">
      <concept id="3348158742936976480" name="jetbrains.mps.lang.structure.structure.EnumerationMemberDeclaration" flags="ng" index="25R33">
        <property id="1421157252384165432" name="memberId" index="3tVfz5" />
        <property id="672037151186491528" name="presentation" index="1L1pqM" />
      </concept>
      <concept id="3348158742936976479" name="jetbrains.mps.lang.structure.structure.EnumerationDeclaration" flags="ng" index="25R3W">
        <reference id="1075010451642646892" name="defaultMember" index="1H5jkz" />
        <child id="3348158742936976577" name="members" index="25R1y" />
      </concept>
      <concept id="1082978164218" name="jetbrains.mps.lang.structure.structure.DataTypeDeclaration" flags="ng" index="AxPO6">
        <property id="7791109065626895363" name="datatypeId" index="3F6X1D" />
      </concept>
      <concept id="1082978499127" name="jetbrains.mps.lang.structure.structure.ConstrainedDataTypeDeclaration" flags="ng" index="Az7Fb">
        <property id="1083066089218" name="constraint" index="FLfZY" />
      </concept>
      <concept id="1169125787135" name="jetbrains.mps.lang.structure.structure.AbstractConceptDeclaration" flags="ig" index="PkWjJ">
        <property id="6714410169261853888" name="conceptId" index="EcuMT" />
        <property id="5092175715804935370" name="conceptAlias" index="34LRSv" />
        <child id="1071489727083" name="linkDeclaration" index="1TKVEi" />
        <child id="1071489727084" name="propertyDeclaration" index="1TKVEl" />
      </concept>
      <concept id="1169125989551" name="jetbrains.mps.lang.structure.structure.InterfaceConceptDeclaration" flags="ig" index="PlHQZ" />
      <concept id="1169127622168" name="jetbrains.mps.lang.structure.structure.InterfaceConceptReference" flags="ig" index="PrWs8">
        <reference id="1169127628841" name="intfc" index="PrY4T" />
      </concept>
      <concept id="1071489090640" name="jetbrains.mps.lang.structure.structure.ConceptDeclaration" flags="ig" index="1TIwiD">
        <property id="1096454100552" name="rootable" index="19KtqR" />
        <reference id="1071489389519" name="extends" index="1TJDcQ" />
        <child id="1169129564478" name="implements" index="PzmwI" />
      </concept>
      <concept id="1071489288299" name="jetbrains.mps.lang.structure.structure.PropertyDeclaration" flags="ig" index="1TJgyi">
        <property id="241647608299431129" name="propertyId" index="IQ2nx" />
        <reference id="1082985295845" name="dataType" index="AX2Wp" />
      </concept>
      <concept id="1071489288298" name="jetbrains.mps.lang.structure.structure.LinkDeclaration" flags="ig" index="1TJgyj">
        <property id="1071599776563" name="role" index="20kJfa" />
        <property id="1071599893252" name="sourceCardinality" index="20lbJX" />
        <property id="1071599937831" name="metaClass" index="20lmBu" />
        <property id="241647608299431140" name="linkId" index="IQ2ns" />
        <reference id="1071599976176" name="target" index="20lvS9" />
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
  <node concept="1TIwiD" id="2oYTVs3bUDZ">
    <property role="EcuMT" value="2755894795215809151" />
    <property role="TrG5h" value="RecordType" />
    <property role="34LRSv" value="record type" />
    <property role="19KtqR" value="true" />
    <property role="3GE5qa" value="types" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="2oYTVs3bUE0" role="PzmwI">
      <ref role="PrY4T" to="tpck:h0TrEE$" resolve="INamedConcept" />
    </node>
    <node concept="1TJgyj" id="2oYTVs3bY4_" role="1TKVEi">
      <property role="IQ2ns" value="2755894795215823141" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="attributes" />
      <property role="20lbJX" value="fLJekj5/_0__n" />
      <ref role="20lvS9" node="2oYTVs3bXnT" resolve="Attribute" />
    </node>
    <node concept="1TJgyj" id="vMXKKlS2ob" role="1TKVEi">
      <property role="IQ2ns" value="572791733908153867" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="businessRules" />
      <property role="20lbJX" value="fLJekj5/_0__n" />
      <ref role="20lvS9" node="3yMAGXdFSNO" resolve="BusinessRule" />
    </node>
  </node>
  <node concept="1TIwiD" id="2oYTVs3bXnT">
    <property role="EcuMT" value="2755894795215820281" />
    <property role="TrG5h" value="Attribute" />
    <property role="34LRSv" value="Attribute" />
    <property role="3GE5qa" value="types" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="2oYTVs3bXnU" role="PzmwI">
      <ref role="PrY4T" to="tpck:h0TrEE$" resolve="INamedConcept" />
    </node>
    <node concept="1TJgyi" id="2oYTVs3bXo5" role="1TKVEl">
      <property role="IQ2nx" value="2755894795215820293" />
      <property role="TrG5h" value="type" />
      <ref role="AX2Wp" node="2oYTVs3bXnW" resolve="Type" />
    </node>
    <node concept="1TJgyi" id="4xKbwNVO3ZW" role="1TKVEl">
      <property role="IQ2nx" value="5219722601421619196" />
      <property role="TrG5h" value="valueKind" />
      <ref role="AX2Wp" node="4xKbwNVO3ZR" resolve="ValueKind" />
    </node>
    <node concept="1TJgyj" id="2oYTVs3bY4B" role="1TKVEi">
      <property role="IQ2ns" value="2755894795215823143" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="value" />
      <ref role="20lvS9" node="2oYTVs3bY4D" resolve="Expression" />
    </node>
  </node>
  <node concept="25R3W" id="2oYTVs3bXnW">
    <property role="3F6X1D" value="2755894795215820284" />
    <property role="TrG5h" value="Type" />
    <property role="3GE5qa" value="types" />
    <node concept="25R33" id="2oYTVs3bXnX" role="25R1y">
      <property role="3tVfz5" value="2755894795215820285" />
      <property role="TrG5h" value="amount" />
      <property role="1L1pqM" value="amount" />
    </node>
    <node concept="25R33" id="2oYTVs3bXo1" role="25R1y">
      <property role="3tVfz5" value="2755894795215820289" />
      <property role="TrG5h" value="dateRange" />
      <property role="1L1pqM" value="date range" />
    </node>
    <node concept="25R33" id="2oYTVs3bXnY" role="25R1y">
      <property role="3tVfz5" value="2755894795215820286" />
      <property role="TrG5h" value="percentage" />
      <property role="1L1pqM" value="percentage" />
    </node>
  </node>
  <node concept="1TIwiD" id="2oYTVs3bXo7">
    <property role="EcuMT" value="2755894795215820295" />
    <property role="TrG5h" value="Number" />
    <property role="34LRSv" value="number" />
    <property role="3GE5qa" value="expr" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="1TJgyi" id="2oYTVs3bXo8" role="1TKVEl">
      <property role="IQ2nx" value="2755894795215820296" />
      <property role="TrG5h" value="value" />
      <ref role="AX2Wp" node="2oYTVs3bXoa" resolve="NumberFormat" />
    </node>
    <node concept="PrWs8" id="2oYTVs3bY4H" role="PzmwI">
      <ref role="PrY4T" node="2oYTVs3bY4D" resolve="Expression" />
    </node>
  </node>
  <node concept="Az7Fb" id="2oYTVs3bXoa">
    <property role="3F6X1D" value="2755894795215820298" />
    <property role="TrG5h" value="NumberFormat" />
    <property role="FLfZY" value="[-]?[0-9]+(\\.[0-9]+)?" />
    <property role="3GE5qa" value="expr" />
  </node>
  <node concept="PlHQZ" id="2oYTVs3bY4D">
    <property role="EcuMT" value="2755894795215823145" />
    <property role="TrG5h" value="Expression" />
    <property role="3GE5qa" value="expr" />
  </node>
  <node concept="1TIwiD" id="2oYTVs3bY4E">
    <property role="EcuMT" value="2755894795215823146" />
    <property role="TrG5h" value="AttributeReference" />
    <property role="34LRSv" value="attribute reference" />
    <property role="3GE5qa" value="expr" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="1TJgyj" id="2oYTVs3bY4F" role="1TKVEi">
      <property role="IQ2ns" value="2755894795215823147" />
      <property role="20kJfa" value="attribute" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="2oYTVs3bXnT" resolve="Attribute" />
    </node>
    <node concept="PrWs8" id="2oYTVs3bY4J" role="PzmwI">
      <ref role="PrY4T" node="2oYTVs3bY4D" resolve="Expression" />
    </node>
    <node concept="PrWs8" id="6aiAwNFLZHl" role="PzmwI">
      <ref role="PrY4T" to="tpck:3fifI_xCcJN" resolve="ScopeProvider" />
    </node>
  </node>
  <node concept="Az7Fb" id="2oYTVs3flFv">
    <property role="3F6X1D" value="2755894795216706271" />
    <property role="TrG5h" value="DateFormat" />
    <property role="FLfZY" value="[0-9]{2}\\/[0-9]{2}\\/[0-9]{4}" />
    <property role="3GE5qa" value="expr" />
  </node>
  <node concept="PlHQZ" id="2oYTVs3fm$F">
    <property role="EcuMT" value="2755894795216709931" />
    <property role="TrG5h" value="Effect" />
    <property role="3GE5qa" value="rules" />
  </node>
  <node concept="1TIwiD" id="3yMAGXdFSNO">
    <property role="EcuMT" value="4085498027130719476" />
    <property role="TrG5h" value="BusinessRule" />
    <property role="34LRSv" value="given-when-then" />
    <property role="3GE5qa" value="rules" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="1TJgyj" id="3yMAGXdFSNR" role="1TKVEi">
      <property role="IQ2ns" value="4085498027130719479" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="condition" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="2oYTVs3bY4D" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="3yMAGXdFSO0" role="1TKVEi">
      <property role="IQ2ns" value="4085498027130719488" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="consequence" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="2oYTVs3fm$F" resolve="Effect" />
    </node>
  </node>
  <node concept="1TIwiD" id="3yMAGXdGA4d">
    <property role="EcuMT" value="4085498027130904845" />
    <property role="TrG5h" value="IntervalOperation" />
    <property role="34LRSv" value="interval operation" />
    <property role="3GE5qa" value="expr" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="1TJgyi" id="3yMAGXdGA4e" role="1TKVEl">
      <property role="IQ2nx" value="4085498027130904846" />
      <property role="TrG5h" value="operator" />
      <ref role="AX2Wp" node="3yMAGXdGVd2" resolve="IntervalOperators" />
    </node>
    <node concept="1TJgyi" id="vMXKKlTwve" role="1TKVEl">
      <property role="IQ2nx" value="572791733908539342" />
      <property role="TrG5h" value="timeUnit" />
      <ref role="AX2Wp" node="3yMAGXdGVcV" resolve="TimeUnits" />
    </node>
    <node concept="1TJgyj" id="3yMAGXdGA4g" role="1TKVEi">
      <property role="IQ2ns" value="4085498027130904848" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="operand" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="2oYTVs3bY4D" resolve="Expression" />
    </node>
    <node concept="PrWs8" id="3yMAGXdGA4l" role="PzmwI">
      <ref role="PrY4T" node="2oYTVs3bY4D" resolve="Expression" />
    </node>
  </node>
  <node concept="25R3W" id="3yMAGXdGVcV">
    <property role="3F6X1D" value="4085498027130991419" />
    <property role="3GE5qa" value="expr" />
    <property role="TrG5h" value="TimeUnits" />
    <node concept="25R33" id="vMXKKlUsmA" role="25R1y">
      <property role="3tVfz5" value="572791733908784550" />
      <property role="TrG5h" value="Monday" />
    </node>
    <node concept="25R33" id="vMXKKlUsmE" role="25R1y">
      <property role="3tVfz5" value="572791733908784554" />
      <property role="TrG5h" value="Tuesday" />
    </node>
    <node concept="25R33" id="vMXKKlUsmJ" role="25R1y">
      <property role="3tVfz5" value="572791733908784559" />
      <property role="TrG5h" value="Wednesday" />
    </node>
    <node concept="25R33" id="vMXKKlUsmP" role="25R1y">
      <property role="3tVfz5" value="572791733908784565" />
      <property role="TrG5h" value="Thursday" />
    </node>
    <node concept="25R33" id="vMXKKlUsmW" role="25R1y">
      <property role="3tVfz5" value="572791733908784572" />
      <property role="TrG5h" value="Friday" />
    </node>
    <node concept="25R33" id="3yMAGXdGVcW" role="25R1y">
      <property role="3tVfz5" value="4085498027130991420" />
      <property role="TrG5h" value="Saturday" />
    </node>
    <node concept="25R33" id="vMXKKlUsn4" role="25R1y">
      <property role="3tVfz5" value="572791733908784580" />
      <property role="TrG5h" value="Sunday" />
    </node>
    <node concept="25R33" id="vMXKKlUsny" role="25R1y">
      <property role="3tVfz5" value="572791733908784610" />
      <property role="TrG5h" value="January" />
    </node>
    <node concept="25R33" id="vMXKKlUsnI" role="25R1y">
      <property role="3tVfz5" value="572791733908784622" />
      <property role="TrG5h" value="February" />
    </node>
    <node concept="25R33" id="vMXKKlUsnV" role="25R1y">
      <property role="3tVfz5" value="572791733908784635" />
      <property role="TrG5h" value="March" />
    </node>
    <node concept="25R33" id="vMXKKlUso9" role="25R1y">
      <property role="3tVfz5" value="572791733908784649" />
      <property role="TrG5h" value="April" />
    </node>
    <node concept="25R33" id="vMXKKlUsoo" role="25R1y">
      <property role="3tVfz5" value="572791733908784664" />
      <property role="TrG5h" value="May" />
    </node>
    <node concept="25R33" id="vMXKKlUsoC" role="25R1y">
      <property role="3tVfz5" value="572791733908784680" />
      <property role="TrG5h" value="June" />
    </node>
    <node concept="25R33" id="vMXKKlUsoT" role="25R1y">
      <property role="3tVfz5" value="572791733908784697" />
      <property role="TrG5h" value="July" />
    </node>
    <node concept="25R33" id="vMXKKlUspb" role="25R1y">
      <property role="3tVfz5" value="572791733908784715" />
      <property role="TrG5h" value="August" />
    </node>
    <node concept="25R33" id="vMXKKlUspu" role="25R1y">
      <property role="3tVfz5" value="572791733908784734" />
      <property role="TrG5h" value="September" />
    </node>
    <node concept="25R33" id="vMXKKlUspM" role="25R1y">
      <property role="3tVfz5" value="572791733908784754" />
      <property role="TrG5h" value="October" />
    </node>
    <node concept="25R33" id="vMXKKlUsq7" role="25R1y">
      <property role="3tVfz5" value="572791733908784775" />
      <property role="TrG5h" value="November" />
    </node>
    <node concept="25R33" id="3yMAGXdGVcX" role="25R1y">
      <property role="3tVfz5" value="4085498027130991421" />
      <property role="TrG5h" value="December" />
    </node>
  </node>
  <node concept="25R3W" id="3yMAGXdGVd2">
    <property role="3F6X1D" value="4085498027130991426" />
    <property role="3GE5qa" value="expr" />
    <property role="TrG5h" value="IntervalOperators" />
    <node concept="25R33" id="3yMAGXdGVd3" role="25R1y">
      <property role="3tVfz5" value="4085498027130991427" />
      <property role="TrG5h" value="containsA" />
      <property role="1L1pqM" value="contains a" />
    </node>
    <node concept="25R33" id="3yMAGXdHKcO" role="25R1y">
      <property role="3tVfz5" value="4085498027131208500" />
      <property role="TrG5h" value="startsIn" />
      <property role="1L1pqM" value="starts in" />
    </node>
  </node>
  <node concept="1TIwiD" id="3yMAGXdHVcD">
    <property role="EcuMT" value="4085498027131253545" />
    <property role="3GE5qa" value="rules" />
    <property role="TrG5h" value="IncrementEffect" />
    <property role="34LRSv" value="add to" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="3yMAGXdHVcE" role="PzmwI">
      <ref role="PrY4T" node="2oYTVs3fm$F" resolve="Effect" />
    </node>
    <node concept="1TJgyj" id="3yMAGXdHVcG" role="1TKVEi">
      <property role="IQ2ns" value="4085498027131253548" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="quantity" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="2oYTVs3bY4D" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="3yMAGXdHVdZ" role="1TKVEi">
      <property role="IQ2ns" value="4085498027131253631" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="attributeRef" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="2oYTVs3bY4E" resolve="AttributeReference" />
    </node>
  </node>
  <node concept="1TIwiD" id="4xKbwNVNV7G">
    <property role="EcuMT" value="5219722601421582828" />
    <property role="3GE5qa" value="expr" />
    <property role="TrG5h" value="BinaryOperation" />
    <property role="34LRSv" value="binary operation" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="1TJgyj" id="4xKbwNVNV7H" role="1TKVEi">
      <property role="IQ2ns" value="5219722601421582829" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="left" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="2oYTVs3bY4D" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="4xKbwNVNV7L" role="1TKVEi">
      <property role="IQ2ns" value="5219722601421582833" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="right" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="2oYTVs3bY4D" resolve="Expression" />
    </node>
    <node concept="PrWs8" id="4xKbwNVNV7J" role="PzmwI">
      <ref role="PrY4T" node="2oYTVs3bY4D" resolve="Expression" />
    </node>
    <node concept="1TJgyi" id="4xKbwNVNV7T" role="1TKVEl">
      <property role="IQ2nx" value="5219722601421582841" />
      <property role="TrG5h" value="operator" />
      <ref role="AX2Wp" node="4xKbwNVNV7O" resolve="BinaryOperators" />
    </node>
  </node>
  <node concept="25R3W" id="4xKbwNVNV7O">
    <property role="3F6X1D" value="5219722601421582836" />
    <property role="3GE5qa" value="expr" />
    <property role="TrG5h" value="BinaryOperators" />
    <node concept="25R33" id="4xKbwNVNV7P" role="25R1y">
      <property role="3tVfz5" value="5219722601421582837" />
      <property role="TrG5h" value="of" />
    </node>
    <node concept="25R33" id="4xKbwNVNV7Q" role="25R1y">
      <property role="3tVfz5" value="5219722601421582838" />
      <property role="TrG5h" value="minus" />
      <property role="1L1pqM" value="-" />
    </node>
  </node>
  <node concept="25R3W" id="4xKbwNVO3ZR">
    <property role="3F6X1D" value="5219722601421619191" />
    <property role="3GE5qa" value="types" />
    <property role="TrG5h" value="ValueKind" />
    <ref role="1H5jkz" node="4xKbwNVO3ZS" resolve="initially" />
    <node concept="25R33" id="4xKbwNVO3ZS" role="25R1y">
      <property role="3tVfz5" value="5219722601421619192" />
      <property role="TrG5h" value="initially" />
    </node>
    <node concept="25R33" id="4xKbwNVO3ZT" role="25R1y">
      <property role="3tVfz5" value="5219722601421619193" />
      <property role="TrG5h" value="computedAs" />
      <property role="1L1pqM" value="computed as" />
    </node>
  </node>
  <node concept="1TIwiD" id="4xKbwNVOTdx">
    <property role="EcuMT" value="5219722601421837153" />
    <property role="3GE5qa" value="types" />
    <property role="TrG5h" value="TypeLiteral" />
    <property role="34LRSv" value="type literal" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="1TJgyi" id="4xKbwNVOTdy" role="1TKVEl">
      <property role="IQ2nx" value="5219722601421837154" />
      <property role="TrG5h" value="type" />
      <ref role="AX2Wp" node="2oYTVs3bXnW" resolve="Type" />
    </node>
  </node>
</model>

