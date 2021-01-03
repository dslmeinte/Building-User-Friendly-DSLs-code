<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:c46c1e58-4b3f-4baf-9d72-05723efd03cf(DSLContent)">
  <persistence version="9" />
  <languages>
    <use id="5197a02f-1dbe-431c-90d1-d409a7d36b90" name="BusinessDsl" version="0" />
  </languages>
  <imports />
  <registry>
    <language id="ceab5195-25ea-4f22-9b92-103b95ca8c0c" name="jetbrains.mps.lang.core">
      <concept id="1169194658468" name="jetbrains.mps.lang.core.structure.INamedConcept" flags="ng" index="TrEIO">
        <property id="1169194664001" name="name" index="TrG5h" />
      </concept>
    </language>
    <language id="5197a02f-1dbe-431c-90d1-d409a7d36b90" name="BusinessDsl">
      <concept id="2755894795215823146" name="BusinessDsl.structure.AttributeReference" flags="ng" index="_4gqt">
        <reference id="2755894795215823147" name="attribute" index="_4gqs" />
      </concept>
      <concept id="2755894795215820295" name="BusinessDsl.structure.NumberLiteral" flags="ng" index="_4j6K">
        <property id="2755894795215820296" name="value" index="_4j6Z" />
      </concept>
      <concept id="2755894795215820281" name="BusinessDsl.structure.DataAttribute" flags="ng" index="_4j9e">
        <property id="2755894795215820293" name="type" index="_4j6M" />
        <child id="2755894795215823143" name="initialValue" index="_4gqg" />
      </concept>
      <concept id="2755894795215809151" name="BusinessDsl.structure.RecordType" flags="ng" index="_4kR8">
        <child id="2755894795215823141" name="attributes" index="_4gqi" />
      </concept>
      <concept id="4085498027130904845" name="BusinessDsl.structure.InfixOperationInvocation" flags="ng" index="1P0fJ2">
        <property id="4085498027130904846" name="operation" index="1P0fJ1" />
        <child id="4085498027130904850" name="right" index="1P0fJt" />
        <child id="4085498027130904848" name="left" index="1P0fJv" />
      </concept>
      <concept id="4085498027130991416" name="BusinessDsl.structure.TimeLiteral" flags="ng" index="1P0iBR">
        <property id="4085498027130991424" name="time" index="1P0iAf" />
      </concept>
      <concept id="4085498027130789478" name="BusinessDsl.structure.BusinessRulesSection" flags="ng" index="1P0wiD">
        <child id="4085498027130789483" name="businessRules" index="1P0wi$" />
      </concept>
      <concept id="4085498027131253545" name="BusinessDsl.structure.AddTo" flags="ng" index="1P1iBA">
        <child id="4085498027131253631" name="attributeRef" index="1P1iAK" />
        <child id="4085498027131253548" name="quantity" index="1P1iBz" />
      </concept>
      <concept id="4085498027130719476" name="BusinessDsl.structure.BusinessRule" flags="ng" index="1P7hoV">
        <reference id="4085498027130719477" name="context" index="1P7hoU" />
        <child id="4085498027130719479" name="condition" index="1P7hoS" />
        <child id="4085498027130719488" name="consequence" index="1P7hvf" />
      </concept>
    </language>
  </registry>
  <node concept="_4kR8" id="2oYTVs3dzXr">
    <property role="TrG5h" value="Rental" />
    <node concept="_4j9e" id="2oYTVs3dUEX" role="_4gqi">
      <property role="TrG5h" value="rental period" />
      <property role="_4j6M" value="2oYTVs3bXo1/periodInDays" />
    </node>
    <node concept="_4j9e" id="2oYTVs3ec2_" role="_4gqi">
      <property role="TrG5h" value="rental price before discount" />
      <property role="_4j6M" value="2oYTVs3bXnX/amount" />
      <node concept="_4j6K" id="2oYTVs3fe8a" role="_4gqg">
        <property role="_4j6Z" value="0.0" />
      </node>
    </node>
    <node concept="_4j9e" id="2oYTVs3ec2C" role="_4gqi">
      <property role="TrG5h" value="discount" />
      <property role="_4j6M" value="2oYTVs3bXnY/percentage" />
      <node concept="_4j6K" id="2oYTVs3fe8f" role="_4gqg">
        <property role="_4j6Z" value="0" />
      </node>
    </node>
    <node concept="_4j9e" id="2oYTVs3ec2G" role="_4gqi">
      <property role="TrG5h" value="rental price after discount" />
      <property role="_4j6M" value="2oYTVs3bXnX/amount" />
      <node concept="_4gqt" id="2oYTVs3fe85" role="_4gqg">
        <ref role="_4gqs" node="2oYTVs3ec2_" resolve="rental price before discount" />
      </node>
    </node>
  </node>
  <node concept="1P0wiD" id="3yMAGXdGjwN">
    <property role="TrG5h" value="Standard" />
    <node concept="1P7hoV" id="3yMAGXdGjwO" role="1P0wi$">
      <ref role="1P7hoU" node="2oYTVs3dzXr" resolve="Rental" />
      <node concept="1P0fJ2" id="3yMAGXdGKP5" role="1P7hoS">
        <property role="1P0fJ1" value="3yMAGXdGVd3/contains" />
        <node concept="_4gqt" id="3yMAGXdGKPc" role="1P0fJv">
          <ref role="_4gqs" node="2oYTVs3dUEX" resolve="rental period" />
        </node>
        <node concept="1P0iBR" id="3yMAGXdHKcL" role="1P0fJt">
          <property role="1P0iAf" value="3yMAGXdGVcW/Saturday" />
        </node>
      </node>
      <node concept="1P1iBA" id="3yMAGXdI6hz" role="1P7hvf">
        <node concept="_4j6K" id="3yMAGXdI6hF" role="1P1iBz">
          <property role="_4j6Z" value="10" />
        </node>
        <node concept="_4gqt" id="3yMAGXdI6hA" role="1P1iAK">
          <ref role="_4gqs" node="2oYTVs3ec2C" resolve="discount" />
        </node>
      </node>
    </node>
    <node concept="1P7hoV" id="3yMAGXdHKcS" role="1P0wi$">
      <ref role="1P7hoU" node="2oYTVs3dzXr" resolve="Rental" />
      <node concept="1P1iBA" id="3yMAGXdI6hI" role="1P7hvf">
        <node concept="_4j6K" id="3yMAGXdJFCP" role="1P1iBz">
          <property role="_4j6Z" value="5" />
        </node>
        <node concept="_4gqt" id="3yMAGXdI6hL" role="1P1iAK">
          <ref role="_4gqs" node="2oYTVs3ec2C" resolve="discount" />
        </node>
      </node>
      <node concept="1P0fJ2" id="3yMAGXdHVcs" role="1P7hoS">
        <property role="1P0fJ1" value="3yMAGXdHKcO/startsIn" />
        <node concept="_4gqt" id="3yMAGXdHVcA" role="1P0fJv">
          <ref role="_4gqs" node="2oYTVs3dUEX" resolve="rental period" />
        </node>
        <node concept="1P0iBR" id="3yMAGXdHVcz" role="1P0fJt">
          <property role="1P0iAf" value="3yMAGXdGVcX/December" />
        </node>
      </node>
    </node>
  </node>
</model>

