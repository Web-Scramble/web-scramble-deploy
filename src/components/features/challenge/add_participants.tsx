import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { searchUser } from "@/services/user";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/shared/loader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/types/authentication";



type ParticipantDropdownProps = {
  // availableUsers: User[];
  selectedUsers: User[];
  setSelectedUsers: (users: User[]) => void;
  label?: string;
  placeholder?: string;
};

const ParticipantDropdown = ({
  // availableUsers,
  selectedUsers,
  setSelectedUsers,
  label = "Invite Participants",
  placeholder = "Enter participant names",
}: ParticipantDropdownProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<User[] | []>([]);
  const [user, setUser] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser(e.target.value);
    if (!user) {
      return;
    }
    searchUserMutation.mutate(e.target.value);
  };

  const searchUserMutation = useMutation({
    mutationFn: searchUser,
    mutationKey: ["searchUser"],
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["searchUser"] });
      if (!data) {
        toast({
          description: "User not Found",
        });
      }
      setAvailableUsers([data.user]);
      // toast({
      //   description: "OTP sent",
      // });
    },
    onError: (error) => {
      // console.log(error.response.data.message);
      toast({
        variant: "destructive",
        title: " failed to resend OTP",
        description: searchUserMutation?.error.response.data.message,
      });
    },
  });

  // Add user to selected users
  const addUser = (user: User) => {
    if (!selectedUsers.some((selected) => selected.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
      inputRef.current?.focus();
    }
  };

  // Remove user from selected users
  const removeUser = (userId: number | string) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className="mb-4 w-full">
      {/* Selected Users Section - Only shown if there are selections */}
      {selectedUsers.length > 0 && (
        <div className="mb-4">
          <Label className="text-xs text-gray-500 mb-2 text-left flex">
            Selected {label} ({selectedUsers.length})
          </Label>
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 bg-gray-100 rounded-full py-1 px-3"
              >
               <Avatar>
                    <AvatarImage src={user.profile} alt={user.name} />
                    <AvatarFallback>{"US"}</AvatarFallback>
                  </Avatar>

                <span className="text-sm">{user.username}</span>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => removeUser(user.id)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Input Section */}
      <Label className="text-xs text-gray-500 mb-1 text-left flex">
        Invite {label}
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          className="h-9 w-full"
          type="text"
          onFocus={() => setIsFocused(true)}
          value={user}
          onChange={handleChange}
        />
        {searchUserMutation.isPending && <LoadingSpinner size={20} />}
        {/* Dropdown - Only shown when input is focused */}
        {isFocused && (
          <div
            ref={dropdownRef}
            className="absolute w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg z-10"
          >
            {/* Suggested Section */}
            <div className="p-2 text-xs text-gray-500 bg-gray-50">
              Suggested (
              {
                availableUsers.filter(
                  (user) =>
                    !selectedUsers.some((selected) => selected.id === user.id)
                ).length
              }
              )
            </div>
            {availableUsers
              .filter(
                (user) =>
                  !selectedUsers.some((selected) => selected.id === user.id)
              )
              .map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => addUser(user)}
                >
                  <Avatar>
                    <AvatarImage src={user.profile} alt={user.name} />
                    <AvatarFallback>{"US"}</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.username}</span>
                    {/* <span className="text-xs text-gray-500">{user.role}</span> */}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantDropdown;
