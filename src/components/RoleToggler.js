import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import RoleIcon from "./RoleIcon";
import { colors } from "../styles";

export default function RoleToggler({role, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <RoleIcon style={styles.icon} role={role} />      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    borderRadius: 4,
    flexDirection: "row",
    paddingLeft: 12
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  chevron: {
      width: 32,
      height: 32
  }
});
